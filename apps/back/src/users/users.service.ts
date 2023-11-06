import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  CategoriaTipos,
  MaquinaUsuarioTipos,
  UsuarioImagemConfigs,
  UsuarioImagemLimites,
  VeiculoImagemConfigs,
  VeiculoImagemLimites,
} from '@agroloc/shared/util';
import { CadastroDto } from './dto/cadastro-user.dto';
import { Enderecos, InformacoesBancarias } from './dto/full-user.dto';
import { Automovel } from './dto/automovel.dto';
import { Senha } from './dto/senha.dto';
import { MaquinaService } from '../maquina/maquina.service';
import { ImagemService } from '../imagem/imagem.service';
import { FavoritoService } from '../favorito/favorito.service';
import { CategoriaService } from '../categoria/categoria.service';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Usuario.name) private UserModel: Model<Usuario>,
    @Inject(forwardRef(() => MaquinaService))
    private readonly maquinaService: MaquinaService,
    @Inject(forwardRef(() => FavoritoService))
    private readonly favoritoService: FavoritoService,
    @Inject(forwardRef(() => CategoriaService))
    private readonly categoriaService: CategoriaService,
    @Inject(forwardRef(() => AvaliacaoService))
    private readonly avaliacaoService: AvaliacaoService,

    private imagemService: ImagemService
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      createUserDto.Login.Tipo !== MaquinaUsuarioTipos.Comum &&
      createUserDto.Login.Tipo !== MaquinaUsuarioTipos.Freteiro
    ) {
      throw new UnauthorizedException(
        'Somente Usuarios do Tipo Comum ou Freteiro podem ser criados!'
      );
    }

    const foundUserEmail = await this.findOneCredentials(
      createUserDto.Login.Email
    );
    if (foundUserEmail) {
      throw new UnauthorizedException('Email já cadastrado!');
    }

    if (createUserDto.Login.Tipo === MaquinaUsuarioTipos.Comum) {
      createUserDto.CadastroFreteiro = undefined;
    }

    createUserDto.Login.Senha = await this.encryparSenha(
      createUserDto.Login.Senha
    );

    const createdUser = this.UserModel.create(createUserDto);
    return createdUser;
  }

  selectUsuario = {
    Login: 0,
    InformacoesBancarias: 0,
    CadastroComum: {
      Enderecos: 0,
    },
    CadastroFreteiro: {
      EnderecoAtivo: {
        idEndereco: 0,
        Cep: 0,
        Bairro: 0,
        Logradouro: 0,
        Complemento: 0,
        Numero: 0,
        _id: 0,
      },
    },
  };

  async findFreteiros(query) {
    const tipoFreteiro = { 'Login.Tipo': MaquinaUsuarioTipos.Freteiro };
    const resPerPage = Number(query.quantidadePorPagina) || 0;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    let ordenar;
    switch (query.ordernarPor) {
      case 'MaisBemAvaliado':
        ordenar = {
          'CadastroFreteiro.NotaGeral': 'desc',
        };
        break;
      case 'OrdemAlfabetica':
        ordenar = {
          'CadastroComum.Nome': 'asc',
        };
        break;
      case 'OrdemAlfabeticaInvertida':
        ordenar = {
          'CadastroComum.Nome': 'desc',
        };
        break;
      default:
        ordenar = {};
    }

    let listedUsers = await this.UserModel.find({
      ...tipoFreteiro,
      // ...busca
    })
      .limit(resPerPage)
      .skip(skip)
      .sort(ordenar)
      .select(this.selectUsuario);

    if (query.busca) {
      const regexPattern = new RegExp(
        query.busca
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .normalize('NFD') //desconsidera acentos
          .replace(/[\u0300-\u036f]/g, ''), //desconsidera acentos
        'ui'
      );
      listedUsers = listedUsers.filter((user) => {
        return regexPattern.test(
          user['NomeCompleto']
            .normalize('NFD') //desconsidera acentos
            .replace(/[\u0300-\u036f]/g, '') //desconsidera acentos
        );
      });
    }
    return listedUsers;
  }

  async findOne(id: string) {
    const foundUser = await this.UserModel.findById(id).select(
      '-Login -InformacoesBancarias'
    );
    return foundUser;
  }

  async findOneSafe(id: string) {
    const foundUser = await this.UserModel.findById(id)
      //ADICIONAR NO SELECT OS FUTUROS CASOS QUANDO TIVER CATEGORIA, AVALIACAO, PROCESSOS ETC...
      .select(this.selectUsuario);
    return foundUser;
  }

  async findCadastro(id: string) {
    const cadastro = await this.UserModel.findById(id).select(
      '+CadastroComum +CadastroFreteiro'
    );
    return cadastro;
  }

  async findOneCustom(customQuery) {
    const foundCustom = await this.UserModel.findOne(customQuery);
    return foundCustom;
  }

  async findMaquinasRegistradas(id: string) {
    const userFound = await this.UserModel.findById(id);
    let maquinasRegistradas = await Promise.all(
      userFound.Maquinas.map(async (maquina) => {
        return await this.maquinaService.findOne(maquina.toString());
      })
    );
    maquinasRegistradas = maquinasRegistradas.filter(
      (maquina) => maquina !== null
    );
    return maquinasRegistradas;
  }

  async findAvaliacoesRegistradas(id: string) {
    const avaliacoes = await this.avaliacaoService.find({
      'UsuarioAvaliador.idUsuarioAvaliador': id,
    });
    return avaliacoes;
  }

  async findUsersPorIdCategoriaAutomovel(idCategoria: string) {
    const usersPorIdCategoriaAutomovel = await this.UserModel.find({
      'CadastroFreteiro.Automovel': {
        $elemMatch: {
          'Categoria.idCategoria': idCategoria,
        },
      },
    });
    return usersPorIdCategoriaAutomovel;
  }

  async updateCadastro(id: string, cadastro: CadastroDto) {
    const userFound = await this.UserModel.findById(id);
    if (
      userFound.CadastroComum.Nome !== cadastro.CadastroComum.Nome ||
      userFound.CadastroComum.Sobrenome !== cadastro.CadastroComum.Sobrenome
    ) {
      const maquinasAchadas = await this.findMaquinasRegistradas(id);
      maquinasAchadas.forEach(async (maquina) => {
        maquina.DonoDaMaquina.Nome =
          cadastro.CadastroComum?.Nome +
          ' ' +
          cadastro.CadastroComum?.Sobrenome;
        await maquina.save();
      });
      const avaliacoesAchadas = await this.findAvaliacoesRegistradas(id);
      avaliacoesAchadas.forEach(async (ava) => {
        ava.UsuarioAvaliador.Nome =
          cadastro.CadastroComum?.Nome +
          ' ' +
          cadastro.CadastroComum?.Sobrenome;
        await ava.save();
      });

      if (userFound.Login.Tipo == 'Freteiro') {
        const freteirosFavoritos = await this.acharFavoritosAtreladosAoFreteiro(
          id
        );
        freteirosFavoritos.forEach(async (fav) => {
          fav.ItemFavorito.Nome =
            cadastro.CadastroComum?.Nome +
            ' ' +
            cadastro.CadastroComum?.Sobrenome;
          await fav.save();
        });
        //
      }
    }
    let cadastroMongoose = new this.UserModel(cadastro);

    if (userFound.Login.Tipo !== 'Freteiro') {
      cadastroMongoose.CadastroFreteiro = undefined;
    } else {
      userFound.CadastroFreteiro = cadastroMongoose.CadastroFreteiro;
      if (
        cadastro.CadastroFreteiro.EstaAtivo == true &&
        cadastro.CadastroFreteiro.IdEndereco == undefined
      ) {
        throw new BadRequestException(
          'Para ativar a maquina, é necessario informar o endereco'
        );
      }
    }

    const enderecos = userFound.CadastroComum.Enderecos;
    userFound.CadastroComum.Nome = cadastroMongoose.CadastroComum.Nome;
    userFound.CadastroComum.Sobrenome =
      cadastroMongoose.CadastroComum.Sobrenome;
    userFound.CadastroComum.DataDeNascimento =
      cadastroMongoose.CadastroComum.DataDeNascimento;
    userFound.CadastroComum.Sexo = cadastroMongoose.CadastroComum.Sexo;
    userFound.CadastroComum.Cpf = cadastroMongoose.CadastroComum.Cpf;
    userFound.CadastroComum.Cnpj = cadastroMongoose.CadastroComum.Cnpj;
    userFound.CadastroComum.Enderecos =
      cadastroMongoose.CadastroComum.Enderecos;
    userFound.CadastroComum.Telefone = cadastroMongoose.CadastroComum.Telefone;

    userFound.CadastroComum.Enderecos = enderecos;
    await userFound.save();

    if (userFound.Login.Tipo == 'Freteiro') {
      if (
        cadastro.CadastroFreteiro.IdEndereco == undefined &&
        userFound.CadastroFreteiro.EnderecoAtivo != undefined
      ) {
        await this.deleteEnderecoFreteiro(id);
      }

      if (cadastro.CadastroFreteiro.IdEndereco != undefined) {
        if (
          cadastro.CadastroFreteiro.IdEndereco.toString() !=
          userFound.CadastroFreteiro.EnderecoAtivo?.idEndereco?.toString()
        ) {
          cadastroMongoose = await this.atualizarEnderecoFreteiro(
            id,
            cadastro.CadastroFreteiro.IdEndereco
          );
        }
      }
    }

    const response = {
      message: 'Cadastro atualizado com sucesso!',
      cadastro: cadastroMongoose,
    };
    return response;
  }

  async acharFavoritosAtreladosAoFreteiro(idFreteiro: string) {
    const favoritosAchados =
      await this.favoritoService.findFavoritosPorIdItemFavorito(idFreteiro);
    return favoritosAchados;
  }

  async atualizarEnderecoFreteiro(
    id: string,
    idEndereco: mongoose.Schema.Types.ObjectId
  ) {
    try {
      const usuario = await this.UserModel.findById(id);

      const endereco = usuario.CadastroComum.Enderecos.find(
        (end) => end._id.toString() === idEndereco.toString()
      );
      if (endereco === undefined) {
        throw new BadRequestException('Esse endereco não existe');
      }

      const enderecoComId = {
        idEndereco,
        Cep: endereco.Cep,
        Estado: endereco.Estado,
        Cidade: endereco.Cidade,
        Bairro: endereco.Bairro,
        Logradouro: endereco.Logradouro,
        Complemento: endereco.Complemento,
        Numero: endereco.Numero,
      };

      usuario.CadastroFreteiro.EnderecoAtivo = enderecoComId;
      await usuario.save();

      return usuario;
    } catch (e) {
      return e;
    }
  }

  async deleteEnderecoFreteiro(id: string) {
    try {
      const usuarioFreteiro = await this.UserModel.findById(id);
      const enderecoFreteiro = usuarioFreteiro.CadastroFreteiro.EnderecoAtivo;

      if (enderecoFreteiro == undefined) {
        throw new BadRequestException('Esse freteiro não possui endereço!');
      }

      usuarioFreteiro.CadastroFreteiro.EnderecoAtivo = undefined;
      let resposta;
      if (usuarioFreteiro.CadastroFreteiro.EstaAtivo == true) {
        usuarioFreteiro.CadastroFreteiro.EstaAtivo = false;
        resposta = {
          message:
            'Endereco removido com sucesso! A maquina foi desativada pois precisa de um endereço pra estar ativa.',
          enderecoMaquina: enderecoFreteiro,
        };
      } else {
        resposta = {
          message: 'Endereco removido com sucesso!',
          enderecoMaquina: enderecoFreteiro,
        };
      }
      await usuarioFreteiro.save();
      return resposta;
    } catch (e) {
      return e;
    }
  }

  async updateSenha(id: string, senhaNova: Senha) {
    const foundUser = await this.UserModel.findById(id);
    foundUser.Login.Senha = await this.encryparSenha(senhaNova.Senha);
    await foundUser.save();
    const response = {
      message: 'Senha atualizada com sucesso!',
    };
    return response;
  }

  async findInformacoesBancarias(id: string) {
    const foundUser = await this.UserModel.findById(id).select(
      'InformacoesBancarias'
    );
    if (
      foundUser.InformacoesBancarias?.ContaBancaria ||
      foundUser.InformacoesBancarias?.Pix
    ) {
      return foundUser.InformacoesBancarias;
    } else {
        throw new Error("Não há Informações bancarias registradas para este usuário")
    }
  }

  async updateInformacoesBancarias(
    id: string,
    informacoesBancarias: InformacoesBancarias
  ) {
    const foundUser = await this.UserModel.findById(id);
    foundUser.InformacoesBancarias = informacoesBancarias;
    await foundUser.save();

    const response = {
      message: 'Informacoes Bancarias atualizadas com sucesso!',
      informacoesBancarias: informacoesBancarias,
    };

    return response;
  }

  async adicionarAutomovel(id: string, automovel: Automovel) {
    const Automovel = {
      ...automovel,
      Categoria: {
        idCategoria: undefined,
        Nome: undefined,
      },
      ImagensSecundarias: [],
      ImagemPrincipal: undefined,
      _id: new mongoose.Types.ObjectId(),
    };

    if (automovel.idCategoria) {
      const categoriaAchada = await this.categoriaService.findOne(
        automovel.idCategoria.toString()
      );
      if (categoriaAchada?.Tipo != CategoriaTipos.Automovel) {
        throw new BadRequestException('Categoria não é de Automovel!');
      }
      if (categoriaAchada) {
        Automovel.Categoria = {
          idCategoria: categoriaAchada._id,
          Nome: categoriaAchada.Nome,
        };
      } else {
        throw new BadRequestException('Categoria não encontrada!');
      }
    } else {
      Automovel.Categoria = undefined;
    }

    const usuario = new this.UserModel(await this.UserModel.findById(id));
    usuario.CadastroFreteiro.Automovel.push(Automovel);

    await usuario.save();
    return Automovel;
  }

  async editarAutomovel(id: string, idAutomovel: string, automovel: Automovel) {
    //IMPLEMENTAR AQUI QUANDO TIVER PROCESSO DE FRETE ATUALIZAR EM TODOS OS PROCESSOS DE FRETE O NOME

    const foundUser = await this.UserModel.findById(id);
    const indexAutomovel = foundUser.CadastroFreteiro.Automovel.findIndex(
      (aut) => aut._id.toString() == idAutomovel
    );

    if (indexAutomovel === -1) {
      throw new UnauthorizedException('Automovel não encontrado!');
    }
    const Automovel = {
      ...automovel,
      Categoria: {
        idCategoria: undefined,
        Nome: undefined,
      },
      ImagensSecundarias:
        foundUser.CadastroFreteiro.Automovel[indexAutomovel].ImagensSecundarias,
      ImagemPrincipal:
        foundUser.CadastroFreteiro.Automovel[indexAutomovel].ImagemPrincipal,
      _id: foundUser.CadastroFreteiro.Automovel[indexAutomovel]._id,
    };

    if (automovel.idCategoria) {
      const categoriaAchada = await this.categoriaService.findOne(
        automovel.idCategoria.toString()
      );
      if (categoriaAchada.Tipo != CategoriaTipos.Automovel) {
        throw new BadRequestException('Categoria não é de Automovel!');
      }
      if (categoriaAchada) {
        Automovel.Categoria = {
          idCategoria: categoriaAchada._id,
          Nome: categoriaAchada.Nome,
        };
      } else {
        throw new BadRequestException('Categoria não encontrada!');
      }
    } else {
      Automovel.Categoria = undefined;
    }

    foundUser.CadastroFreteiro.Automovel[indexAutomovel] = Automovel;
    await foundUser.save();
    const response = {
      message: 'Automovel atualizado com sucesso!',
      automovel: automovel,
    };
    return response;
  }

  async removerAutomovel(id: string, idAutomovel: string) {
    const foundUser = await this.UserModel.findById(id);
    const automoveisSemAtualAutomovel =
      foundUser.CadastroFreteiro.Automovel.filter(
        (aut) => aut._id.toString() != idAutomovel
      );

    if (
      foundUser.CadastroFreteiro.Automovel.length ===
      automoveisSemAtualAutomovel.length
    ) {
      throw new UnauthorizedException('Automovel não encontrado!');
    }
    foundUser.CadastroFreteiro.Automovel = automoveisSemAtualAutomovel;
    await foundUser.save();
    const response = {
      message: 'Automovel removido com sucesso!',
    };

    return response;
  }

  async adicionarEndereco(id: string, endereco: Enderecos) {
    const usuario = new this.UserModel(await this.UserModel.findById(id));
    const EnderecoComId = { ...endereco, _id: new mongoose.Types.ObjectId() };
    usuario.CadastroComum.Enderecos.push(EnderecoComId);
    await usuario.save();
    return EnderecoComId;
  }

  async editarEndereco(id: string, idEndereco: string, endereco: Enderecos) {
    const foundUser = await this.UserModel.findById(id);
    const indexEndereco = foundUser.CadastroComum.Enderecos.findIndex(
      (end) => end._id.toString() == idEndereco
    );

    if (indexEndereco === -1) {
      throw new UnauthorizedException('Endereço não encontrado!');
    }
    const Endereco = {
      ...endereco,
      _id: foundUser.CadastroComum.Enderecos[indexEndereco]._id,
    };
    foundUser.CadastroComum.Enderecos[indexEndereco] = Endereco;

    const maquinasAchadas = await this.findMaquinasRegistradas(id);

    maquinasAchadas.filter((maq) => maq.Endereco?.idEndereco == idEndereco);

    maquinasAchadas.forEach(async (maq) => {
      maq.Endereco.idEndereco = idEndereco;
      maq.Endereco.Cep = Endereco.Cep;
      maq.Endereco.Estado = Endereco.Estado;
      maq.Endereco.Cidade = Endereco.Cidade;
      maq.Endereco.Bairro = Endereco.Bairro;
      maq.Endereco.Logradouro = Endereco.Logradouro;
      maq.Endereco.Complemento = Endereco.Complemento;
      maq.Endereco.Numero = Endereco.Numero;
      await maq.save();
    });

    if (foundUser.Login.Tipo == 'Freteiro') {
      if (
        foundUser.CadastroFreteiro.EnderecoAtivo.idEndereco.toString() ==
        idEndereco
      ) {
        const EnderecoAtivo = {
          idEndereco: foundUser.CadastroFreteiro.EnderecoAtivo?.idEndereco,
          Cep: Endereco.Cep,
          Estado: Endereco.Estado,
          Cidade: Endereco.Cidade,
          Bairro: Endereco.Bairro,
          Logradouro: Endereco.Logradouro,
          Complemento: Endereco.Complemento,
          Numero: Endereco.Numero,
        };
        foundUser.CadastroFreteiro.EnderecoAtivo = EnderecoAtivo;
      }
    }
    await foundUser.save();

    const response = {
      message: 'Endereço atualizado com sucesso!',
      automovel: endereco,
    };
    return response;
  }

  async removerEndereco(id: string, idEndereco: string) {
    const foundUser = await this.UserModel.findById(id);
    const enderecosSemAtualEndereco = foundUser.CadastroComum.Enderecos.filter(
      (end) => end._id.toString() != idEndereco
    );

    if (
      foundUser.CadastroComum.Enderecos.length ===
      enderecosSemAtualEndereco.length
    ) {
      throw new UnauthorizedException('Endereço não encontrado!');
    }

    foundUser.CadastroComum.Enderecos = enderecosSemAtualEndereco;

    if (
      foundUser.CadastroFreteiro?.EnderecoAtivo?.idEndereco?.toString() ==
      idEndereco
    ) {
      foundUser.CadastroFreteiro.EnderecoAtivo = undefined;
    }

    const maquinasAchadas = await this.findMaquinasRegistradas(id);
    maquinasAchadas.filter((maq) => maq.Endereco?.idEndereco == idEndereco);
    maquinasAchadas.forEach(async (maq) => {
      maq.Endereco = undefined;
      await maq.save();
    });

    await foundUser.save();
    const response = {
      message: 'Endereço removido com sucesso!',
    };

    return response;
  }

  async createFotoPerfil(imagem: Express.Multer.File, id: string) {
    try {
      let ImagemAtual = undefined;
      const usuario = await this.UserModel.findById(id);

      if (usuario.CadastroComum.Foto) {
        ImagemAtual = {
          Url: usuario.CadastroComum.Foto.Url,
          NomeArquivo: usuario.CadastroComum.Foto.NomeArquivo,
        };
      }

      const result = await this.imagemService.createImagem(
        imagem,
        UsuarioImagemConfigs,
        UsuarioImagemLimites,
        ImagemAtual
      );

      const ImagemPrincipal = {
        ImagemPrincipal: {
          Url: result.secure_url,
          NomeArquivo: result.original_filename,
        },
      };

      usuario.CadastroComum.Foto = ImagemPrincipal.ImagemPrincipal;
      await usuario.save();

      if (usuario.Login.Tipo == 'Freteiro') {
        const freteirosFavoritos = await this.acharFavoritosAtreladosAoFreteiro(
          id
        );
        freteirosFavoritos.forEach(async (fav) => {
          fav.ItemFavorito.ImagemPrincipal = {
            Url: ImagemPrincipal.ImagemPrincipal?.Url,
            NomeArquivo: ImagemPrincipal.ImagemPrincipal?.NomeArquivo,
          };
          await fav.save();
        });
      }

      if (usuario.Login.Tipo == 'Comum') {
        const avaliacoesAchadas = await this.findAvaliacoesRegistradas(id);
        avaliacoesAchadas.forEach(async (ava) => {
          ava.UsuarioAvaliador.Foto = {
            Url: ImagemPrincipal.ImagemPrincipal?.Url,
            NomeArquivo: ImagemPrincipal.ImagemPrincipal?.NomeArquivo,
          };
          await ava.save();
        });
      }

      return result.response;
    } catch (e) {
      return e;
    }
  }

  async removerFotoPerfil(id: string) {
    try {
      const Maquina = new this.UserModel(await this.UserModel.findById(id));

      const ImagemAchada = Maquina.CadastroComum.Foto;

      if (ImagemAchada === undefined) {
        throw new BadRequestException('Algo de ruim ocorreu', {
          cause: new Error(),
          description: 'Essa imagem não existe',
        });
      }

      const ImagemADeletar = {
        Url: ImagemAchada.Url,
        NomeArquivo: ImagemAchada.NomeArquivo,
      };

      const response = this.imagemService.deleteImagem(
        UsuarioImagemConfigs.caminhoImagemPrincipalCloudinary,
        ImagemADeletar
      );

      Maquina.CadastroComum.Foto = undefined;

      await Maquina.save();

      const freteirosFavoritos = await this.acharFavoritosAtreladosAoFreteiro(
        id
      );
      freteirosFavoritos.forEach(async (fav) => {
        fav.ItemFavorito.ImagemPrincipal = undefined;
        await fav.save();
      });

      const avaliacoesAchadas = await this.findAvaliacoesRegistradas(id);
      avaliacoesAchadas.forEach(async (ava) => {
        ava.UsuarioAvaliador.Foto = undefined;
        await ava.save();
      });

      return response;
    } catch (e) {
      return e;
    }
  }

  async createImagemPrincipalAutomovel(
    imagem: Express.Multer.File,
    id: string,
    idAutomovel: string
  ) {
    try {
      let ImagemAtual = undefined;
      const usuario = await this.UserModel.findById(id);

      const imagemAchada = usuario.CadastroFreteiro.Automovel.find(
        (aut) => aut._id.toString() == idAutomovel
      ).ImagemPrincipal;

      if (imagemAchada) {
        ImagemAtual = {
          Url: imagemAchada.Url,
          NomeArquivo: imagemAchada.NomeArquivo,
        };
      }

      const result = await this.imagemService.createImagem(
        imagem,
        VeiculoImagemConfigs,
        VeiculoImagemLimites,
        ImagemAtual
      );

      const ImagemPrincipal = {
        ImagemPrincipal: {
          Url: result.secure_url,
          NomeArquivo: result.original_filename,
        },
      };

      const indiceAutomovel = usuario.CadastroFreteiro.Automovel.findIndex(
        (aut) => aut._id.toString() == idAutomovel
      );
      usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagemPrincipal =
        ImagemPrincipal.ImagemPrincipal;
      await usuario.save();

      return result.response;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemPrincipalAutomovel(id: string, idAutomovel: string) {
    try {
      const Usuario = new this.UserModel(await this.UserModel.findById(id));

      const imagemAchada = Usuario.CadastroFreteiro.Automovel.find(
        (aut) => aut._id.toString() == idAutomovel
      ).ImagemPrincipal;

      if (imagemAchada === undefined) {
        throw new BadRequestException('Algo de ruim ocorreu', {
          cause: new Error(),
          description: 'Essa imagem não existe',
        });
      }

      const ImagemADeletar = {
        Url: imagemAchada.Url,
        NomeArquivo: imagemAchada.NomeArquivo,
      };

      const response = this.imagemService.deleteImagem(
        VeiculoImagemConfigs.caminhoImagemPrincipalCloudinary,
        ImagemADeletar
      );

      const indiceAutomovel = Usuario.CadastroFreteiro.Automovel.findIndex(
        (aut) => aut._id.toString() == idAutomovel
      );
      Usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagemPrincipal =
        undefined;

      await Usuario.save();

      return response;
    } catch (e) {
      return e;
    }
  }

  async createImagemsSecundarias(
    imagens: Array<Express.Multer.File>,
    id: string,
    idAutomovel: string
  ) {
    try {
      const result = await this.imagemService.createImagemsSecundarias(
        imagens,
        VeiculoImagemConfigs,
        VeiculoImagemLimites
      );

      const usuario = await this.UserModel.findById(id);
      const indiceAutomovel = usuario.CadastroFreteiro.Automovel.findIndex(
        (aut) => aut._id.toString() == idAutomovel
      );
      usuario.CadastroFreteiro.Automovel[
        indiceAutomovel
      ].ImagensSecundarias.push(...result.imagensAdicionadas);
      usuario.save();

      return result.response;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemSecundaria(
    id: string,
    idAutomovel: string,
    filename: string
  ) {
    try {
      const Usuario = new this.UserModel(await this.UserModel.findById(id));

      const veiculo = Usuario.CadastroFreteiro.Automovel.find(
        (aut) => aut._id.toString() == idAutomovel
      );

      const ImagemAchada = veiculo.ImagensSecundarias.find(
        (ImagensSecundarias) => ImagensSecundarias.NomeArquivo === filename
      );

      if (ImagemAchada === undefined) {
        throw new BadRequestException('Algo de ruim ocorreu', {
          cause: new Error(),
          description: 'Essa imagem não existe',
        });
      }

      const ImagemADeletar = {
        Url: ImagemAchada.Url,
        NomeArquivo: ImagemAchada.NomeArquivo,
      };

      const indiceAutomovel = Usuario.CadastroFreteiro.Automovel.findIndex(
        (aut) => aut._id.toString() == idAutomovel
      );
      Usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagensSecundarias =
        Usuario.CadastroFreteiro.Automovel[
          indiceAutomovel
        ].ImagensSecundarias.filter(
          (ImagensSecundarias) =>
            ImagensSecundarias.NomeArquivo != ImagemADeletar.NomeArquivo
        );

      await this.imagemService.deleteImagem(
        VeiculoImagemConfigs.caminhoImagensSecundariasCloudinary,
        ImagemADeletar
      );

      await Usuario.save();

      const resposta = {
        message: 'Foto removida com sucesso!',
        FotoRemovida: { ...ImagemADeletar },
      };

      return resposta;
    } catch (e) {
      return e;
    }
  }

  async findOneCredentials(email: string) {
    const foundCredentials = await this.UserModel.findOne({
      'Login.Email': email,
    }).select('Login _id');
    return foundCredentials;
  }

  async findLoginTipo(id: string) {
    const foundCredentials = await this.UserModel.findById(id).select(
      'Login.Tipo'
    );
    return foundCredentials;
  }

  async encryparSenha(senha: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(senha, saltOrRounds);
  }

  remove(id: string) {
    const deletedUser = this.UserModel.findByIdAndDelete(id).select('-Login');
    return deletedUser;
  }
}

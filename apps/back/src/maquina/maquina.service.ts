import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUpdateMaquinaDto } from './dto/create-update-maquina.dto';
import { Maquina } from './entities/maquina.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CategoriaTipos,
  MaquinaImagemConfigs,
  MaquinaImagemLimites,
} from '@agroloc/shared/util';
import { ImagemService } from '../imagem/imagem.service';
import { UsersService } from '../users/users.service';
import { FavoritoService } from '../favorito/favorito.service';
import { TipoPrecoService } from '../tipo-preco/tipo-preco.service';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class MaquinaService {
  constructor(
    @InjectModel(Maquina.name) private maquinaModel: Model<Maquina>,
    private imagemService: ImagemService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => FavoritoService))
    private favoritoService: FavoritoService,
    @Inject(forwardRef(() => TipoPrecoService))
    private tipoPreco: TipoPrecoService,
    @Inject(forwardRef(() => CategoriaService))
    private categoriaService: CategoriaService
  ) {}

  async create(createMaquinaDto: CreateUpdateMaquinaDto, request) {
    try {
      const idUsuario = request.user.IdUsuario;
      const usuarioDono = await this.usersService.findOne(idUsuario);

      if (
        createMaquinaDto.EstaAtiva == true &&
        createMaquinaDto.IdEndereco == undefined
      ) {
        throw new BadRequestException(
          'Para ativar a maquina, é necessario informar o endereco'
        );
      }

      if (createMaquinaDto.IdEndereco != undefined) {
        const usuario = await this.usersService.findCadastro(
          idUsuario.toString()
        );
        const endereco = usuario.CadastroComum.Enderecos.find(
          (end) => end._id.toString() === createMaquinaDto.IdEndereco.toString()
        );
        if (endereco === undefined) {
          throw new BadRequestException('Esse endereco não existe');
        }
      }

      const maquinaDtoComIdUsuario = {
        ...createMaquinaDto,
        Categoria: {
          idCategoria: createMaquinaDto.IdCategoria,
          Nome: undefined,
        },
        Preco: {
          ValorPorTipo: createMaquinaDto.Preco.ValorPorTipo,
          Tipo: {
            idTipo: createMaquinaDto.Preco.idTipo,
            Nome: undefined,
          },
        },
        DonoDaMaquina: {
          idDono: idUsuario,
          Nome:
            usuarioDono.CadastroComum.Nome +
            ' ' +
            usuarioDono.CadastroComum.Sobrenome,
          Foto: usuarioDono.CadastroComum.Foto,
        },
      };

      if (createMaquinaDto.IdCategoria) {
        const categoria = await this.categoriaService.findOne(
          createMaquinaDto.IdCategoria.toString()
        );
        if (categoria) {
          if (categoria.Tipo == CategoriaTipos.Maquina) {
            const categoriaFormadata = {
              idCategoria: categoria.id,
              Nome: categoria.Nome,
            };
            maquinaDtoComIdUsuario.Categoria = categoriaFormadata;
          } else {
            throw new BadRequestException(
              'Essa categoria não é do tipo maquina!'
            );
          }
        } else {
          throw new BadRequestException('Categoria não existe!');
        }
      } else {
        throw new BadRequestException('Maquina Esta sem Categoria!');
      }

      const tipoPreco = await this.tipoPreco.findOne(
        createMaquinaDto.Preco.idTipo.toString()
      );
      if (tipoPreco) {
        maquinaDtoComIdUsuario.Preco.Tipo.Nome = tipoPreco.Nome;
        maquinaDtoComIdUsuario.Preco.Tipo.idTipo = tipoPreco.id;
      } else {
        throw new BadRequestException('Tipo de preço não existe!');
      }

      const createdMaquina = await this.maquinaModel.create(
        maquinaDtoComIdUsuario
      );

      usuarioDono.Maquinas.push(createdMaquina.id);
      await usuarioDono.save();
      await this.atualizarEndereco(
        createdMaquina.id,
        createMaquinaDto.IdEndereco
      );

      await createdMaquina.save();
      return createdMaquina;
    } catch (e) {
      return e;
    }
  }

  async find(query) {
    try {
      const resPerPage = Number(query.quantidadePorPagina) || 0;
      const currentPage = Number(query.page) || 1;
      const skip = resPerPage * (currentPage - 1);
      // const busca = query.busca
      //   ? {
      //       Nome: {
      //         $regex: query.busca
      //       },
      //     }
      //   : {};

      if (query.categoria) {
        query.categoria = query.categoria.split(',');
      }

      const categoria = query.categoria
        ? {
            'Categoria.Nome': {
              $in: [...query.categoria],
            },
          }
        : {};

      const tipoPreco = query.tipoPreco
        ? {
            'Preco.Tipo.Nome': query.tipoPreco,
          }
        : {};

      const precoMin = query.precoMin
        ? {
            'Preco.ValorPorTipo': {
              $gte: Number(query.precoMin),
              $lte: Number(query.precoMax ? query.precoMax : 999999999),
            },
          }
        : {};

      const precoMax = query.precoMax
        ? {
            'Preco.ValorPorTipo': {
              $lte: Number(query.precoMax),
              $gte: Number(query.precoMin ? query.precoMin : 0),
            },
          }
        : {};

      let ordenar;

      switch (query.ordernarPor) {
        case 'MaisBemAvaliado':
          ordenar = {
            NotaGeral: 'desc',
          };
          break;
        case 'OrdemAlfabetica':
          ordenar = {
            Nome: 'asc',
          };
          break;
        case 'OrdemAlfabeticaInvertida':
          ordenar = {
            Nome: 'desc',
          };
          break;
        case 'MaisRecentementeCriado':
          ordenar = {
            createdAt: 'desc',
          };
          break;
        case 'MenosRecentementeCriado':
          ordenar = {
            createdAt: 'asc',
          };
          break;
        case 'MaisRecentementeAtualizado':
          ordenar = {
            updatedAt: 'desc',
          };
          break;
        case 'MenosRecentementeAtualizado':
          ordenar = {
            updatedAt: 'asc',
          };
          break;
        default:
          ordenar = {};
      }

      let maquinas = await this.maquinaModel
        .find({
          // ...busca,
          ...categoria,
          ...tipoPreco,
          ...precoMax,
          ...precoMin,
        })
        .limit(resPerPage)
        .skip(skip)
        .sort({ ...ordenar });

      if (query.busca) {
        const regexPattern = new RegExp(
          query.busca
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .normalize('NFD') //desconsidera acentos
            .replace(/[\u0300-\u036f]/g, ''), //desconsidera acentos
          'ui'
        );
        maquinas = maquinas.filter((maq) =>
          regexPattern.test(
            maq.Nome.normalize('NFD') //desconsidera acentos
              .replace(/[\u0300-\u036f]/g, '') //desconsidera acentos
          )
        );
      }

      return maquinas;
    } catch (e) {
      return e;
    }
  }

  async findOneSafe(id: string) {
    try {
      const select = {
        Endereco: 0,
      };
      const foundMaquina = await this.maquinaModel.findById(id).select(select);
      return foundMaquina;
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string) {
    try {
      const foundMaquina = await this.maquinaModel.findById(id);
      return foundMaquina;
    } catch (e) {
      return e;
    }
  }

  async findOneCustom(customQuery) {
    const foundCustom = await this.maquinaModel.findOne(customQuery);
    return foundCustom;
  }

  async findMaquinasPorIdPreco(id: string) {
    const foundMaquina = await this.maquinaModel.find({
      'Preco.Tipo.idTipo': id,
    });
    return foundMaquina;
  }

  async findMaquinasPorIdCategoria(id: string) {
    const foundMaquinas = await this.maquinaModel.find({
      'Categoria.idCategoria': id,
    });
    return foundMaquinas;
  }

  async update(id: string, updateMaquinaDto: CreateUpdateMaquinaDto) {
    // try{

    if (
      updateMaquinaDto.EstaAtiva == true &&
      updateMaquinaDto.IdEndereco == undefined
    ) {
      throw new BadRequestException(
        'Para ativar a maquina, é necessario informar o endereco'
      );
    }

    const maquina = await this.maquinaModel.findById(id);

    if (maquina.Nome != updateMaquinaDto.Nome) {
      const maquinasFavoritas = await this.acharFavoritosAtreladosAMaquina(id);
      maquinasFavoritas.forEach(async (fav) => {
        fav.ItemFavorito.Nome = updateMaquinaDto.Nome;
        await fav.save();
      });
    }

    maquina.Nome = updateMaquinaDto.Nome;
    maquina.Descricao = updateMaquinaDto.Descricao;
    maquina.Peso = updateMaquinaDto.Peso;
    maquina.Comprimento = updateMaquinaDto.Comprimento;
    maquina.Largura = updateMaquinaDto.Largura;
    maquina.Altura = updateMaquinaDto.Altura;
    maquina.EstaAtiva = updateMaquinaDto.EstaAtiva;

    if (updateMaquinaDto.IdCategoria) {
      const categoria = await this.categoriaService.findOne(
        updateMaquinaDto.IdCategoria.toString()
      );
      if (categoria) {
        if (categoria.Tipo == CategoriaTipos.Maquina) {
          const categoriaFormadata = {
            idCategoria: categoria.id,
            Nome: categoria.Nome,
          };
          maquina.Categoria = categoriaFormadata;
        } else {
          throw new BadRequestException(
            'Essa categoria não é do tipo maquina!'
          );
        }
      } else {
        throw new BadRequestException('Categoria não existe!');
      }
    } else {
      maquina.Categoria = undefined;
    }

    const tipoPreco = await this.tipoPreco.findOne(
      updateMaquinaDto.Preco.idTipo.toString()
    );
    if (tipoPreco) {
      const tipoPrecoFormatado = { idTipo: tipoPreco.id, Nome: tipoPreco.Nome };
      maquina.Preco.ValorPorTipo = updateMaquinaDto.Preco.ValorPorTipo;
      maquina.Preco.Tipo = tipoPrecoFormatado;
    } else {
      throw new BadRequestException('Tipo de preço não existe!');
    }

    if (maquina.EstaAtiva == true && maquina.Preco.Tipo == undefined) {
      throw new BadRequestException(
        'A maquina deve ter um preço para estar ativa!'
      );
    }

    await maquina.save();

    if (
      updateMaquinaDto.IdEndereco == undefined &&
      maquina.Endereco != undefined
    ) {
      await this.excluirEndereco(id);
    }

    if (updateMaquinaDto.IdEndereco != undefined) {
      if (
        updateMaquinaDto.IdEndereco.toString() !=
        maquina.Endereco?.idEndereco?.toString()
      ) {
        await this.atualizarEndereco(id, updateMaquinaDto.IdEndereco);
      }
    }

    return maquina;
    // }catch(e){
    //   return e;
    // }
  }

  async remove(id: string, request) {
    try {
      const idUsuario = request.user.IdUsuario;
      const usuarioDono = await this.usersService.findOne(idUsuario);
      usuarioDono.Maquinas = usuarioDono.Maquinas.filter(
        (maq) => maq.toString() !== id
      );
      await usuarioDono.save();
      await this.deletarImagensAoExcluirMaquina(id);
      const deletedMaquina = await this.maquinaModel.findByIdAndDelete(id);
      return deletedMaquina;
    } catch (e) {
      return e;
    }
  }

  async deletarImagensAoExcluirMaquina(id: string) {
    //implementar aqui no futuro, caso a maquina esteja atrelada a algum processo, nao excluir a imagem principal
    await this.deleteImagemPrincipal(id);
    const foundMaquina = await this.maquinaModel.findById(id);

    await Promise.all(
      foundMaquina.ImagensSecundarias.map(async (Imagem) => {
        await this.deleteImagemSecundaria(Imagem.NomeArquivo, id);
        return 'Ok';
      })
    );
  }

  async acharFavoritosAtreladosAMaquina(idMaquina: string) {
    const favoritosAchados =
      await this.favoritoService.findFavoritosPorIdItemFavorito(idMaquina);
    return favoritosAchados;
  }

  async atualizarEndereco(
    id: string,
    idEndereco: mongoose.Schema.Types.ObjectId
  ) {
    try {
      const maquina = await this.maquinaModel.findById(id);
      const usuario = await this.usersService.findCadastro(
        maquina.DonoDaMaquina.idDono.toString()
      );

      const endereco = usuario.CadastroComum.Enderecos.find(
        (end) => end._id.toString() === idEndereco.toString()
      );
      if (endereco === undefined) {
        throw new BadRequestException('Esse endereco não existe');
      }
      delete endereco._id;

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

      maquina.Endereco = enderecoComId;

      await maquina.save();
      return maquina;
    } catch (e) {
      return e;
    }
  }

  async excluirEndereco(id: string) {
    try {
      const maquina = await this.maquinaModel.findById(id);
      const enderecoMaquina = maquina.Endereco;
      if (maquina.Endereco == undefined) {
        throw new BadRequestException('Essa maquina não possui endereço!');
      }
      maquina.Endereco = undefined;
      let resposta;
      if (maquina.EstaAtiva == true) {
        maquina.EstaAtiva = false;
        resposta = {
          message:
            'Endereco removido com sucesso! A maquina foi desativada pois precisa de um endereço pra estar ativa.',
          enderecoMaquina,
        };
      } else {
        resposta = {
          message: 'Endereco removido com sucesso!',
          enderecoMaquina,
        };
      }
      await maquina.save();
      return resposta;
    } catch (e) {
      return e;
    }
  }

  async createImagemPrincipal(imagem: Express.Multer.File, idMaquina: string) {
    try {
      let ImagemAtual = undefined;
      const maquina = await this.maquinaModel.findById(idMaquina);
      if (maquina.ImagemPrincipal) {
        ImagemAtual = {
          Url: maquina.ImagemPrincipal.Url,
          NomeArquivo: maquina.ImagemPrincipal.NomeArquivo,
        };
      }

      const result = await this.imagemService.createImagem(
        imagem,
        MaquinaImagemConfigs,
        MaquinaImagemLimites,
        ImagemAtual
      );

      const ImagemPrincipal = {
        ImagemPrincipal: {
          Url: result.secure_url,
          NomeArquivo: result.original_filename,
        },
      };

      await this.maquinaModel.updateOne(
        { _id: idMaquina },
        { $set: ImagemPrincipal }
      );

      const maquinasFavoritas = await this.acharFavoritosAtreladosAMaquina(
        idMaquina
      );
      maquinasFavoritas.forEach(async (fav) => {
        fav.ItemFavorito.ImagemPrincipal = {
          Url: ImagemPrincipal.ImagemPrincipal?.Url,
          NomeArquivo: ImagemPrincipal.ImagemPrincipal?.NomeArquivo,
        };
        await fav.save();
      });

      return result.response;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemPrincipal(id: string) {
    try {
      const Maquina = new this.maquinaModel(
        await this.maquinaModel.findById(id)
      );

      const ImagemAchada = Maquina.ImagemPrincipal;

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
        MaquinaImagemConfigs.caminhoImagemPrincipalCloudinary,
        ImagemADeletar
      );

      Maquina.ImagemPrincipal = undefined;

      await Maquina.save();

      const maquinasFavoritas = await this.acharFavoritosAtreladosAMaquina(id);
      maquinasFavoritas.forEach(async (fav) => {
        fav.ItemFavorito.ImagemPrincipal = undefined;
        await fav.save();
      });

      return response;
    } catch (e) {
      return e;
    }
  }

  async createImagemsSecundarias(
    imagens: Array<Express.Multer.File>,
    idMaquina: string
  ) {
    try {
      const result = await this.imagemService.createImagemsSecundarias(
        imagens,
        MaquinaImagemConfigs,
        MaquinaImagemLimites
      );
      const maquina = await this.maquinaModel.findById(idMaquina);
      maquina.ImagensSecundarias.push(...result.imagensAdicionadas);
      maquina.save();

      return result.response;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemSecundaria(filename: string, id: string) {
    try {
      const Maquina = new this.maquinaModel(
        await this.maquinaModel.findById(id)
      );
      const ImagemAchada = Maquina.ImagensSecundarias.find(
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

      Maquina.ImagensSecundarias = Maquina.ImagensSecundarias.filter(
        (ImagensSecundarias) =>
          ImagensSecundarias.NomeArquivo != ImagemADeletar.NomeArquivo
      );

      await this.imagemService.deleteImagem(
        MaquinaImagemConfigs.caminhoImagensSecundariasCloudinary,
        ImagemADeletar
      );

      await Maquina.save();

      const resposta = {
        message: 'Foto removida com sucesso!',
        FotoRemovida: { ...ImagemADeletar },
      };

      return resposta;
    } catch (e) {
      return e;
    }
  }
}

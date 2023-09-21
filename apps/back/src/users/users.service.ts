import { BadRequestException, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MaquinaUsuarioTipos, UsuarioImagemConfigs, UsuarioImagemLimites, VeiculoImagemConfigs, VeiculoImagemLimites } from '@agroloc/shared/util';
import { CadastroDto } from './dto/cadastro-user.dto';
import { Enderecos, InformacoesBancarias } from './dto/full-user.dto';
import { Automovel } from './dto/automovel.dto';
import { Senha } from './dto/senha.dto';
import { MaquinaService } from '../maquina/maquina.service';
import { ImagemService } from '../imagem/imagem.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario.name) private UserModel: Model<Usuario>, 
  @Inject(forwardRef(() => MaquinaService)) private readonly maquinaService: MaquinaService,
  private imagemService: ImagemService) {}

  async create(createUserDto: CreateUserDto) {

    if(createUserDto.Login.Tipo !== MaquinaUsuarioTipos.Comum && createUserDto.Login.Tipo !== MaquinaUsuarioTipos.Freteiro){
      throw new UnauthorizedException("Somente Usuarios do Tipo Comum ou Freteiro podem ser criados!");
    }

    const foundUserEmail = await this.findOneCredentials(createUserDto.Login.Email);
    if(foundUserEmail){
      throw new UnauthorizedException("Email já cadastrado!");
    }

    if(createUserDto.Login.Tipo === MaquinaUsuarioTipos.Comum){
      createUserDto.CadastroFreteiro = undefined;
    }

    createUserDto.Login.Senha = await this.encryparSenha(
      createUserDto.Login.Senha
    );

    const createdUser = this.UserModel.create(createUserDto);
    return createdUser;
  }

  findFreteiros(query) {
    const tipoFreteiro = {'Login.Tipo': MaquinaUsuarioTipos.Freteiro}
    const resPerPage = Number(query.quantidadePorPagina) || 0;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const busca = query.busca
    ? {
        "CadastroComum.Nome": {
          $regex: query.busca,
          $options: 'i',
        },
      }
    : {};

    let ordenar;
    switch (query.ordernarPor) {
      case 'MaisBemAvaliado':
        ordenar = {
          //A IMPLEMENTAR QUANDO AVALIACOES TIVER IMPLEMENTADA
        };
        break;
      case 'OrdemAlfabetica':
        ordenar = {
          "CadastroComum.Nome": 'asc',
        };
        break;
      case 'OrdemAlfabeticaInvertida':
        ordenar = {
          "CadastroComum.Nome": 'desc',
        };
        break;
      default:
        ordenar = {};
    }

    const select = "-Login -InformacoesBancarias";

    const listedUsers = this.UserModel.find({
      ...tipoFreteiro,
      ...busca
      }) 
      .limit(resPerPage)
      .skip(skip)
      .sort(ordenar)
      .select(select);

      return listedUsers;
  }

  async findOne(id: string) {
    const foundUser = await this.UserModel.findById(id).select('-Login -InformacoesBancarias');
    return foundUser;
  }

  async findCadastro(id: string){
    const cadastro = await this.UserModel.findById(id).select("+CadastroComum +CadastroFreteiro");
    return cadastro;
  }

  async findMaquinasRegistradas(id: string){
    const userFound = await this.UserModel.findById(id);  
    const maquinasRegistradas = await Promise.all(userFound.Maquinas.map( async maquina => {
      return await this.maquinaService.findOne(maquina.toString());
    }))
    return maquinasRegistradas;
  }

  async updateCadastro(id: string, cadastro: CadastroDto){
    const userFound = await this.UserModel.findById(id);
    if((userFound.CadastroComum.Nome !== cadastro.CadastroComum.Nome) || (userFound.CadastroComum.Sobrenome !== cadastro.CadastroComum.Sobrenome)){
      const maquinasAchadas = await this.findMaquinasRegistradas(id);
      maquinasAchadas.forEach(async maquina => {
        maquina.DonoDaMaquina.Nome = cadastro.CadastroComum.Nome + " " + cadastro.CadastroComum.Sobrenome;
        await maquina.save();
      });
    }
    const cadastroMongoose = new this.UserModel(cadastro);

    if (userFound.Login.Tipo !== "Freteiro"){
      cadastroMongoose.CadastroFreteiro = undefined;
    }else{
      userFound.CadastroFreteiro = cadastroMongoose.CadastroFreteiro;
    }

    userFound.CadastroComum = cadastroMongoose.CadastroComum;
    await userFound.save();

    const response = {
      message: 'Cadastro atualizado com sucesso!',
      cadastro: cadastroMongoose
    };
    return response;
  }

  async updateSenha(id: string, senhaNova: Senha){
    const foundUser = await this.UserModel.findById(id);
    foundUser.Login.Senha = await this.encryparSenha(senhaNova.Senha);
    await foundUser.save();
    const response = {
      message: 'Senha atualizada com sucesso!',
    };
    return response;
  }

  async findInformacoesBancarias(id: string) {
    const foundUser = await this.UserModel.findById(id).select('InformacoesBancarias');
    if(foundUser.InformacoesBancarias?.ContaBancaria || foundUser.InformacoesBancarias?.Pix){
      return foundUser.InformacoesBancarias;
    }else{
      return {message: "Não há Informações bancarias registradas para este usuário"}
    }
  }

  async updateInformacoesBancarias(id: string, informacoesBancarias: InformacoesBancarias){
    
    const foundUser = await this.UserModel.findById(id);
    foundUser.InformacoesBancarias = informacoesBancarias;
    await foundUser.save();

    const response = {
      message: 'Informacoes Bancarias atualizadas com sucesso!',
      informacoesBancarias: informacoesBancarias
    };

    return response
  }


  async adicionarAutomovel(id:string, automovel: Automovel){
    const Automovel = {...automovel, ImagensSecundarias: [], ImagemPrincipal: undefined, _id: new mongoose.Types.ObjectId()};
    const usuario = new this.UserModel(await this.UserModel.findById(id));
    usuario.CadastroFreteiro.Automovel.push(Automovel);

    await usuario.save();
    return Automovel;
  }

  async editarAutomovel(id:string, idAutomovel:string, automovel: Automovel){
    //IMPLEMENTAR AQUI QUANDO TIVER PROCESSO DE FRETE ATUALIZAR EM TODOS OS PROCESSOS DE FRETE O NOME

    const foundUser = await this.UserModel.findById(id);
    const indexAutomovel = foundUser.CadastroFreteiro.Automovel.findIndex( aut => aut._id.toString() == idAutomovel);
    
    if(indexAutomovel === -1){
      throw new UnauthorizedException("Automovel não encontrado!");
    }
    const Automovel = {
      ...automovel, 
      ImagensSecundarias: foundUser.CadastroFreteiro.Automovel[indexAutomovel].ImagensSecundarias, 
      ImagemPrincipal: foundUser.CadastroFreteiro.Automovel[indexAutomovel].ImagemPrincipal, 
      _id: foundUser.CadastroFreteiro.Automovel[indexAutomovel]._id
    };
    foundUser.CadastroFreteiro.Automovel[indexAutomovel] = Automovel;
    await foundUser.save();
    const response = {
      message: 'Automovel atualizado com sucesso!',
      automovel: automovel
    };
    return response
  }

  async removerAutomovel(id:string, idAutomovel: string){
    const foundUser = await this.UserModel.findById(id);
    const automoveisSemAtualAutomovel = foundUser.CadastroFreteiro.Automovel.filter((aut) => aut._id.toString() != idAutomovel);
    
    if(foundUser.CadastroFreteiro.Automovel.length === automoveisSemAtualAutomovel.length){
      throw new UnauthorizedException("Automovel não encontrado!");
    }
    foundUser.CadastroFreteiro.Automovel = automoveisSemAtualAutomovel;
    await foundUser.save();
    const response = {
      message: 'Automovel removido com sucesso!',
    };

    return response
  }

  async adicionarEndereco(id:string, endereco: Enderecos){
    const usuario = new this.UserModel(await this.UserModel.findById(id));
    const EnderecoComId = {...endereco, _id: new mongoose.Types.ObjectId()};
    usuario.CadastroComum.Enderecos.push(EnderecoComId);
    await usuario.save();
    return EnderecoComId;
  }

  async editarEndereco(id:string, idEndereco:string, endereco: Enderecos){
    const foundUser = await this.UserModel.findById(id);
    const indexMaquina = foundUser.CadastroComum.Enderecos.findIndex( end => end._id.toString() == idEndereco);
    
    if(indexMaquina === -1){
      throw new UnauthorizedException("Endereço não encontrado!");
    }
    const Endereco = {
      ...endereco, 
      _id: foundUser.CadastroComum.Enderecos[indexMaquina]._id
    };
    foundUser.CadastroComum.Enderecos[indexMaquina] = Endereco;
    await foundUser.save();
    const response = {
      message: 'Endereço atualizado com sucesso!',
      automovel: endereco
    };
    return response
  }

  async removerEndereco(id:string, idEndereco: string){
    const foundUser = await this.UserModel.findById(id);
    const enderecosSemAtualEndereco = foundUser.CadastroComum.Enderecos.filter((end) => end._id.toString() != idEndereco);
    
    if(foundUser.CadastroComum.Enderecos.length === enderecosSemAtualEndereco.length){
      throw new UnauthorizedException("Endereço não encontrado!");
    }
    foundUser.CadastroComum.Enderecos = enderecosSemAtualEndereco;
    await foundUser.save();
    const response = {
      message: 'Endereço removido com sucesso!',
    };

    return response
  }


  async createFotoPerfil(imagem: Express.Multer.File, id: string){
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
      
      return result.response;
    } catch (e) {
      return e;
    }
  }

  async removerFotoPerfil(id: string){
    try {
      const Maquina = new this.UserModel(
        await this.UserModel.findById(id)
      );

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

      return response;
    } catch (e) {
      return e;
    }
  }

  async createImagemPrincipalAutomovel(imagem: Express.Multer.File, id: string, idAutomovel:string){
    try {
      let ImagemAtual = undefined;
      const usuario = await this.UserModel.findById(id);

      const imagemAchada = usuario.CadastroFreteiro.Automovel.find((aut) => aut._id.toString() == idAutomovel).ImagemPrincipal;

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

      const indiceAutomovel = usuario.CadastroFreteiro.Automovel.findIndex((aut) => aut._id.toString() == idAutomovel);
      usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagemPrincipal = ImagemPrincipal.ImagemPrincipal;
      await usuario.save();
      
      return result.response;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemPrincipalAutomovel(id: string, idAutomovel:string){
    try {
      const Usuario = new this.UserModel(
        await this.UserModel.findById(id)
      );

      const imagemAchada = Usuario.CadastroFreteiro.Automovel.find((aut) => aut._id.toString() == idAutomovel).ImagemPrincipal;

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

      const indiceAutomovel = Usuario.CadastroFreteiro.Automovel.findIndex((aut) => aut._id.toString() == idAutomovel);
      Usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagemPrincipal = undefined;

      await Usuario.save();

      return response;
    } catch (e) {
      return e;
    }
  }

  async createImagemsSecundarias(imagens: Array<Express.Multer.File>, id:string, idAutomovel: string){
    try {
      const result = await this.imagemService.createImagemsSecundarias(
        imagens,
        VeiculoImagemConfigs,
        VeiculoImagemLimites
      );

      const usuario = await this.UserModel.findById(id);
      const indiceAutomovel = usuario.CadastroFreteiro.Automovel.findIndex((aut) => aut._id.toString() == idAutomovel);
      usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagensSecundarias.push(...result.imagensAdicionadas);
      usuario.save();

      return result.response;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemSecundaria(id: string, idAutomovel: string, filename: string){
    try {
      const Usuario = new this.UserModel(
        await this.UserModel.findById(id)
      );
      
      const veiculo = Usuario.CadastroFreteiro.Automovel.find((aut) => aut._id.toString() == idAutomovel);
      
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

      const indiceAutomovel = Usuario.CadastroFreteiro.Automovel.findIndex((aut) => aut._id.toString() == idAutomovel);
      Usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagensSecundarias 
      = Usuario.CadastroFreteiro.Automovel[indiceAutomovel].ImagensSecundarias.filter(
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

  async encryparSenha(senha: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(senha, saltOrRounds);
  }

  remove(id: string) {
    const deletedUser = this.UserModel.findByIdAndDelete(id).select('-Login');
    return deletedUser;
  }
}

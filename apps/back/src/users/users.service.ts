import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MaquinaUsuarioTipos } from '@agroloc/shared/util';
import { CadastroDto } from './dto/cadastro-user.dto';
import { InformacoesBancarias } from './dto/full-user.dto';
import { Automovel } from './dto/automovel.dto';
import { Senha } from './dto/senha.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario.name) private UserModel: Model<Usuario>) {}

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

async updateCadastro(id: string, cadastro: CadastroDto){
  const userFound = await this.UserModel.findById(id);
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
    const Automovel = {...automovel, ImagensSecundarias: [], ImagemPrincipal: undefined};
    const usuario = new this.UserModel(await this.UserModel.findById(id));
    usuario.CadastroFreteiro.Automovel.push(Automovel);
    await usuario.save();
    return Automovel;
  }

  async editarAutomovel(id:string, idAutomovel:string, automovel: Automovel){
    // const foundUser = await this.UserModel.findById(id);
    // // const objeto = foundUser.toObject();
    // foundUser.CadastroFreteiro.Automovel.findIndex( aut => aut._id == idAutomovel);
    //A IMPLEMENTAR
    return "A implementar"
  }

  async removerAutomovel(id:string, idAutomovel: string){
    //A IMPLEMENTAR
    return "A implementar";
  }

  async createFotoPerfil(imagem: Express.Multer.File, idMaquina: string){
    //A IMPLEMENTAR
    return "A implementar";
  }

  async removerFotoPerfil(id: string){
    //A IMPLEMENTAR
    return "A implementar";
  }

  async createImagemPrincipalVeiculo(imagem: Express.Multer.File, idMaquina: string){
    //A IMPLEMENTAR
    return "A implementar";
  }

  async deleteImagemPrincipalVeiculo(id: string){
    //A IMPLEMENTAR
    return "A implementar";
  }

  async createImagemsSecundarias(imagens: Array<Express.Multer.File>, idMaquina: string){
    //A IMPLEMENTAR
    return "A implementar";
  }

  async deleteImagemSecundaria(filename: string, id: string){
    //A IMPLEMENTAR
    return "A implementar";
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

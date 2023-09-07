/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
  isNotEmpty,
} from '@nestjs/class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer'

class CadastroComum {
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  NomeCompleto: string;
  @IsNotEmpty()
  DataDeNascimento: Date;
  @IsNotEmpty()
  Sexo: string;
  @IsNotEmpty()
  Telefone: string[];
  @IsNotEmpty()
  Cpf: string;
  @IsNotEmpty()
  Cnpj: string;
  @IsOptional()
  Foto: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Enderecos)
  Enderecos: Enderecos[];
}

class Enderecos {
  //idEnderecos: mongoose.Schema.Types.ObjectId;
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  Cep: string;
  @IsNotEmpty()
  Cidade: string;
  @IsNotEmpty()
  Bairro: string;
  @IsNotEmpty()
  Logradouro: string;
  @IsOptional()
  Complemento: string;
  @IsNotEmpty()
  Numero: number;
}

class Login {
  @IsNotEmpty()
  UserName: string;
  @IsNotEmpty()
  Email: string;
  @IsNotEmpty()
  Senha: string;
  @IsNotEmpty()
  Salt: string;
  @IsNotEmpty()
  Tipo: string;
}

class CadastroFreteiro {
 CNH: string;
 @IsNotEmpty()
  @ValidateNested()
  @Type(() => Automovel)
  Automovel: Automovel[];
}

class Automovel {
  //idAutomovel
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  Nome: string;
  @IsNotEmpty()
  Descricao: string;
  @IsNotEmpty()
  Peso: number;
  @IsNotEmpty()
  Comprimento: number;
  @IsNotEmpty()
  Largura: number;
  @IsNotEmpty()
  Altura: number;
  @IsNotEmpty()
  Imagens: string[];
  Categoria: Categoria[];
}

class Categoria {
  idCategoria: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  Nome: string;
}
export class CreateUserDto {

  CadastroComum: CadastroComum;
  Login: Login;
  CadastroFreteiro: CadastroFreteiro;
}

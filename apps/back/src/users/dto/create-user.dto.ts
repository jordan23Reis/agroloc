/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
  isNotEmpty,
} from '@nestjs/class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';

class CadastroComum {
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  Nome: string;
  @IsNotEmpty()
  @IsString()
  Sobrenome: string;
  @IsNotEmpty()
  @IsDate()
  DataDeNascimento: Date;
  @IsNotEmpty()
  @IsString()
  Sexo: string;
  @IsNotEmpty()
  Telefone: string[];
  @IsNotEmpty()
  @IsString()
  Cpf: string;
  @IsNotEmpty()
  @IsString()
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
  @IsOptional()
  Bairro: string;
  @IsNotEmpty()
  Logradouro: string;
  @IsOptional()
  Complemento: string;
  @IsOptional()
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
  //Imagem: string[];
  Categoria: Categoria[];
}

class Imagem {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinAutomovelImagem)
  
}

class Categoria {
  idCategoria: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  Nome: string;
}

class Favoritos {
  //idFavoritos: mongoose.Schema.Types.ObjectId;
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Maquina)
  Maquina: Maquina[];
}

class Maquina {
  idMaquina: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  Nome: string;
  @IsNotEmpty()
  Imagens: string[];
}

class MaquinasAlugadas {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProcessoDeAluguel)
  ProcessoDeAluguel: ProcessoDeAluguel[];
}

class ProcessoDeAluguel {
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  DataInicio: Date;
  @IsNotEmpty()
  DataTermino: Date;
  @IsNotEmpty()
  Status: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Pagamento)
  Pagamento: Pagamento[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Maquina)
  Maquina: Maquina[];

  Envolvidos: Envolvidos[];
}

class Pagamento {
  @IsNotEmpty()
  @IsString()
  TipoPagamento: string;
  @IsNotEmpty()
  @IsNumber()
  Valor: number;
  @IsNotEmpty()
  @IsNumber()
  QuantificadorPreco: number;
  @IsNotEmpty()
  @IsString()
  Status: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Preco)
  Preco: Preco[];
}

class Preco {
  @IsNotEmpty()
  @IsNumber()
  ValorPorTipo: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Tipo)
  Tipo: Tipo[];
}

class Tipo {
  idTipo: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  Nome: string;
}

class Envolvidos {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Locador)
  Locador: Locador[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Locatario)
  Locatario: Locatario[];
}

class Locador {
  idLocador: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  Nome: string;
  @IsOptional()
  @IsString()
  Foto: string;
}

class Locatario {
  idLocatario: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  Nome: string;
  @IsOptional()
  @IsString()
  Foto: string;
}

export class CreateUserDto {
  CadastroComum: CadastroComum;

  Login: Login;

  CadastroFreteiro: CadastroFreteiro;

  Favoritos: Favoritos;

  MaquinasAlugadas: MaquinasAlugadas;
}

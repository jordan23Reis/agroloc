/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
  isNotEmpty,
} from '@nestjs/class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';

class Categoria {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdCategoria)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdCategoria)
  idCategoria: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCategoria)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCategoria)
  Nome: string;
}

class Imagem {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinUrlImagem)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxAutomovelImagem)
  Url: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinUrlImagem)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxAutomovelImagem)
  NomeArquivo: string;
}

class Automovel {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNomeAutomovel)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNomeAutomovel)
  Nome: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinDescricaoAutomovel)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxDescricaoAutomovel)
  Descricao: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.pesoMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.pesoMaxAutomovel)
  Peso: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.comprimentoMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.comprimentoMaxAutomovel)
  Comprimento: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.larguraMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.larguraMaxAutomovel)
  Largura: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.alturaMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.alturaMaxAutomovel)
  Altura: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Imagem)
  ImagemPrincipal: Imagem;

  @IsOptional()
  @ValidateNested()
  @Type(() => Imagem)
  ImagensSecundarias: Imagem[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Categoria)
  Categoria: Categoria;
}

class CadastroFreteiro {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCnh)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMinCnh)
  CNH: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Automovel)
  Automovel: Automovel[];
}

class Enderecos {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCep)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCep)
  Cep: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNomeCidade)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNomeCidade)
  Cidade: string;

  @IsOptional()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNomeBairro)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNomeBairro)
  Bairro: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinLogradouro)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxLogradouro)
  Logradouro: string;

  @IsOptional()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinComplemento)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxComplemento)
  Complemento: string;

  @IsOptional()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.tamMinNumero)
  @Max(UsuarioSchemaDtoRestraints.tamMaxNumero)
  Numero: number;
}

class Pix {
  @MinLength(UsuarioSchemaDtoRestraints.tamMinChavePix)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxChavePix)
  @IsString()
  Chave: string;

  @MinLength(UsuarioSchemaDtoRestraints.tamMinTipoPix)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxTipoPix)
  @IsString()
  Tipo: string;
}

class CadastroComum {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNome)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNome)
  Nome: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinSobrenome)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxSobrenome)
  Sobrenome: string;

  @IsNotEmpty()
  @IsDate()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinDataNascimento)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxDataNascimento)
  DataDeNascimento: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinSexo)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxSexo)
  Sexo: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNumeroTelefone)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNumeroTelefone)
  Telefone: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCpf)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCpf)
  Cpf: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCnpj)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCnpj)
  Cnpj: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Imagem)
  Foto: Imagem;

  @IsOptional()
  @ValidateNested()
  @Type(() => Enderecos)
  Enderecos: Enderecos[];
}

class ContaBancaria {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinAgenciaContaBancaria)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxAgenciaContaBancaria)
  Agencia: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinContaContaBancaria)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxContaContabancaria)
  Conta: string;
}

class InformacoesBancarias {
  @IsOptional()
  @ValidateNested()
  @Type(() => ContaBancaria)
  ContaBancaria: ContaBancaria;

  @IsOptional()
  @ValidateNested()
  @Type(() => Pix)
  Pix: Pix;
}

class Login {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinEmail)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxEmail)
  Email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinSenha)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxSenha)
  Senha: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinSalt)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxSalt)
  Salt: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinTipo)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxTipo)
  Tipo: string;
}

export class CreateUserDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CadastroComum)
  CadastroComum: CadastroComum;

  @IsOptional()
  @ValidateNested()
  @Type(() => CadastroFreteiro)
  CadastroFreteiro: CadastroFreteiro;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Maquinas: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Favoritos: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  MaquinasAlugadas: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  MaquinasLocadas: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  FretesRealizados: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  FretesSolicitados: mongoose.Schema.Types.ObjectId[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Login)
  Login: Login;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => InformacoesBancarias)
  InformacoesBancarias: InformacoesBancarias;
}

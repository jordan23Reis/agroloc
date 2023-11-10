/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
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
import { MaquinaUsuarioTipos, UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';

import { IsBoolean, IsEnum } from 'class-validator';

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
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxUrlImagem)
  Url: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinArquivoImagem)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxArquivoImagem)
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

  @IsOptional()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.pesoMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.pesoMaxAutomovel)
  Peso: number;

  @IsOptional()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.comprimentoMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.comprimentoMaxAutomovel)
  Comprimento: number;

  @IsOptional()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.larguraMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.larguraMaxAutomovel)
  Largura: number;

  @IsOptional()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.alturaMinAutomovel)
  @Max(UsuarioSchemaDtoRestraints.alturaMaxAutomovel)
  Altura: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Imagem)
  @IsObject()
  ImagemPrincipal: Imagem;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => Imagem)
  ImagensSecundarias: Imagem[];

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => Categoria)
  Categoria: Categoria;
}

class EnderecoAtivo {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCep)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCep)
  Cep: string

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNomeCidade)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNomeCidade)
  Cidade: string

  @IsOptional()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNomeBairro)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNomeBairro)
  Bairro: string

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinLogradouro)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxLogradouro)
  Logradouro: string

  @IsOptional()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinComplemento)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxComplemento)
  Complemento: string

  @IsOptional()
  @IsNumber()
  @Min(UsuarioSchemaDtoRestraints.tamMinNumero)
  @Max(UsuarioSchemaDtoRestraints.tamMaxNumero)
  Numero: number
}

export class CadastroFreteiro {
  @IsNotEmpty()
  @IsBoolean()
  EstaAtivo: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCnh)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCnh)
  CNH: string;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => Automovel)
  Automovel: Automovel[];

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => EnderecoAtivo)
  EnderecoAtivo: EnderecoAtivo;

}

export class Enderecos {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCep)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCep)
  Cep: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNomeEstado)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNomeEstado)
  Estado: string;

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

export class CadastroComum {
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
  @IsDateString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinDataNascimento)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxDataNascimento)
  DataDeNascimento: mongoose.Schema.Types.Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinSexo)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxSexo)
  Sexo: string;

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinNumeroTelefone, { each: true })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxNumeroTelefone, { each: true })
  @IsString({ each: true })
  Telefone: string[];

  @IsOptional()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCpf)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCpf)
  Cpf: string;

  @IsOptional()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCnpj)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCnpj)
  Cnpj: string;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => Imagem)
  Foto: Imagem;

  @IsOptional()
  @ValidateNested()
  @IsArray()
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

export class InformacoesBancarias {
  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => ContaBancaria)
  ContaBancaria: ContaBancaria;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => Pix)
  Pix: Pix;
}

class Login {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
  @IsEnum(MaquinaUsuarioTipos)
  @MinLength(UsuarioSchemaDtoRestraints.tamMinTipo)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxTipo)
  Tipo: string;
}

class CreateUserDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CadastroComum)
  @IsObject()
  CadastroComum: CadastroComum;

  @IsOptional()
  @ValidateNested()
  @Type(() => CadastroFreteiro)
  @IsObject()
  CadastroFreteiro: CadastroFreteiro;

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdMaquina, { each: true })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdMaquina, { each: true })
  @IsString({ each: true })
  Maquinas: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdFavorito, { each: true })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdFavorito, { each: true })
  @IsString({ each: true })
  Favoritos: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdProcessoDeAluguel, {
    each: true,
  })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdProcessoDeAluguel, {
    each: true,
  })
  @IsString({ each: true })
  MaquinasAlugadas: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdProcessoDeAluguel, {
    each: true,
  })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdProcessoDeAluguel, {
    each: true,
  })
  @IsString({ each: true })
  MaquinasLocadas: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdProcessoDeFrete, { each: true })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdProcessoDeFrete, { each: true })
  @IsString({ each: true })
  FretesRealizados: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinIdProcessoDeFrete, { each: true })
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdProcessoDeFrete, { each: true })
  @IsString({ each: true })
  FretesSolicitados: mongoose.Schema.Types.ObjectId[];

  @IsNotEmpty()
  @ValidateNested()
  @IsObject()
  @Type(() => Login)
  Login: Login;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => InformacoesBancarias)
  InformacoesBancarias: InformacoesBancarias;
}

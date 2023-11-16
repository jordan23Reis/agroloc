/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from '@nestjs/class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { MaquinaUsuarioTipos, UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';

import { IsEnum } from 'class-validator';


class CadastroFreteiro {
  @IsNotEmpty()
  @IsString()
  @MinLength(UsuarioSchemaDtoRestraints.tamMinCnh)
  @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCnh)
  CNH: string;
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

export class CreateUserDto {
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

  @IsNotEmpty()
  @ValidateNested()
  @IsObject()
  @Type(() => Login)
  Login: Login;


}

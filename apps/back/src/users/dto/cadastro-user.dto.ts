import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { UsuarioSchemaDtoRestraints } from "@agroloc/shared/util";
import mongoose from "mongoose";
import { Enderecos } from "./full-user.dto";

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
  
    // @IsOptional()
    // @ValidateNested()
    // @IsArray()
    // @Type(() => Enderecos)
    // Enderecos: Enderecos[];
  
  }



class CadastroFreteiro {
    @IsNotEmpty()
    @IsBoolean()
    EstaAtivo: boolean;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(UsuarioSchemaDtoRestraints.tamMinCnh)
    @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCnh)
    CNH: string;

    @IsOptional()
    @IsString()
    IdEndereco: mongoose.Schema.Types.ObjectId;
}


export class CadastroDto{
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
}
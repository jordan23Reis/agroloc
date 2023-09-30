import { UsuarioSchemaDtoRestraints } from "@agroloc/shared/util";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsNumber, Min, Max, ValidateNested, IsObject, IsArray } from "class-validator";
import mongoose from "mongoose";

// class Categoria {
//     @IsNotEmpty()
//     @IsString()
//     @MinLength(UsuarioSchemaDtoRestraints.tamMinIdCategoria)
//     @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdCategoria)
//     idCategoria: mongoose.Schema.Types.ObjectId;
  
//     // @IsNotEmpty()
//     // @IsString()
//     // @MinLength(UsuarioSchemaDtoRestraints.tamMinCategoria)
//     // @MaxLength(UsuarioSchemaDtoRestraints.tamMaxCategoria)
//     // Nome: string;
//   }

export class Automovel {
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
    @IsString()
    @MinLength(UsuarioSchemaDtoRestraints.tamMinIdCategoria)
    @MaxLength(UsuarioSchemaDtoRestraints.tamMaxIdCategoria)
    idCategoria: mongoose.Schema.Types.ObjectId;
  }
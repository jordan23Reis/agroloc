import mongoose from "mongoose";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested} from 'class-validator';
import {MaquinaSchemaDtoRestraints } from "@agroloc/shared/util"
import { Type } from 'class-transformer';



// class Tipo {
//     @IsNotEmpty()
//     @IsString()
//     idTipo: mongoose.Schema.Types.ObjectId;   

//     @IsNotEmpty()
//     @IsString()
//     @MinLength(MaquinaSchemaDtoRestraints.tamMinTipo)
//     @MaxLength(MaquinaSchemaDtoRestraints.tamMaxTipo)
//     Nome: string
// }

class Preco {
    @IsNotEmpty()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.ValorPorTipoMin)
    @Max(MaquinaSchemaDtoRestraints.ValorPorTipoMax)
    ValorPorTipo: number

    @IsNotEmpty()
    @IsString()
    idTipo: mongoose.Schema.Types.ObjectId;   
}

// class Categoria{
//     @IsNotEmpty()
//     @IsString()
//     idCategoria: mongoose.Schema.Types.ObjectId;

//     @IsNotEmpty()
//     @IsString()
//     @MinLength(MaquinaSchemaDtoRestraints.tamMinCategoria)
//     @MaxLength(MaquinaSchemaDtoRestraints.tamMaxCategoria)
//     Nome: string
// }

export class CreateUpdateMaquinaDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinNomeMaquina)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxNomeMaquina)
    Nome: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinDescricaoMaquina)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxDescricaoMaquina)
    Descricao: string;

    @IsOptional()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.pesoMinMaquina)
    @Max(MaquinaSchemaDtoRestraints.pesoMaxMaquina)
    Peso: number;

    @IsOptional()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.comprimentoMinMaquina)
    @Max(MaquinaSchemaDtoRestraints.comprimentoMaxMaquina)
    Comprimento: number;

    @IsOptional()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.larguraMinMaquina)
    @Max(MaquinaSchemaDtoRestraints.larguraMaxMaquina)
    Largura: number;

    @IsOptional()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.alturaMinMaquina)
    @Max(MaquinaSchemaDtoRestraints.alturaMaxMaquina)
    Altura: number;

    @IsNotEmpty()
    @IsBoolean()
    EstaAtiva: boolean;

    @IsOptional()
    @IsString()
    IdCategoria: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @IsString()
    IdEndereco: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Preco)
    Preco: Preco;
}

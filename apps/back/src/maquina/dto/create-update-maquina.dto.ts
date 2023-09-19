import mongoose from "mongoose";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested} from 'class-validator';
import {MaquinaSchemaDtoRestraints } from "@agroloc/shared/util"
import { Type } from 'class-transformer';



class Tipo {
    @IsNotEmpty()
    @IsString()
    idTipo: mongoose.Schema.Types.ObjectId;   

    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinTipo)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxTipo)
    Nome: string
}

class Preco {
    @IsNotEmpty()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.ValorPorTipoMin)
    @Max(MaquinaSchemaDtoRestraints.ValorPorTipoMax)
    ValorPorTipo: number

    @IsOptional()
    @ValidateNested()
    @Type(() => Tipo)
    Tipo: Tipo;
}

class Endereco {
    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinCep)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxCep)
    Cep: string

    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinCidade)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxCidade)
    Cidade: string

    @IsOptional()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinBairro)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxBairro)
    Bairro: string

    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinLogradouro)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxLogradouro)
    Logradouro: string

    @IsOptional()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinComplemento)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxComplemento)
    Complemento: string

    @IsOptional()
    @IsNumber()
    @Min(MaquinaSchemaDtoRestraints.numeroMin)
    @Max(MaquinaSchemaDtoRestraints.numeroMax)
    Numero: number
}

class Categoria{
    @IsNotEmpty()
    @IsString()
    idCategoria: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(MaquinaSchemaDtoRestraints.tamMinCategoria)
    @MaxLength(MaquinaSchemaDtoRestraints.tamMaxCategoria)
    Nome: string
}

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
    @ValidateNested()
    @Type(() => Categoria)
    Categoria: Categoria;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Endereco)
    Endereco: Endereco;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Preco)
    Preco: Preco;
}

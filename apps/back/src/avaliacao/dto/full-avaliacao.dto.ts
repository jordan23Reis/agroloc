import { AvaliacaoSchemaDtoRestraints, AvaliacaoTipos } from "@agroloc/shared/util";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import mongoose from "mongoose";


class Foto {

    @IsNotEmpty()
    @IsString()
    @MinLength(AvaliacaoSchemaDtoRestraints.tamMinUrlImagem)
    @MaxLength(AvaliacaoSchemaDtoRestraints.tamMaxUrlImagem)
    Url: string;
    
    @IsNotEmpty()
    @MinLength(AvaliacaoSchemaDtoRestraints.tamMinArquivoImagem)
    @MaxLength(AvaliacaoSchemaDtoRestraints.tamMaxArquivoImagem)
    @IsString()
    NomeArquivo: string;

}

class UsuarioAvaliador {

    @IsNotEmpty()
    @IsString()
    @MinLength( AvaliacaoSchemaDtoRestraints.tamMinIdUsuarioAvaliador)
    @MaxLength( AvaliacaoSchemaDtoRestraints.tamMaxIdUsuarioAvaliador)
    idUsuarioAvaliador: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(AvaliacaoSchemaDtoRestraints.tamMinNome)
    @MaxLength(AvaliacaoSchemaDtoRestraints.tamMaxNome)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @IsObject()
    @Type(() => Foto)
    Foto: Foto;
}

export class FullAvaliacaoDto {
    @IsNotEmpty()
    @IsInt()
    @Min(AvaliacaoSchemaDtoRestraints.minNivelAvaliacao)
    @Max(AvaliacaoSchemaDtoRestraints.maxNivelAvaliacao)
    Nivel: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(AvaliacaoTipos)
    Tipo: string;

    @IsOptional()
    @IsString()
    @MinLength(AvaliacaoSchemaDtoRestraints.tamMinComentarioAvaliacao)
    @MaxLength(AvaliacaoSchemaDtoRestraints.tamMaxComentarioAvaliacao)
    Comentario: string;
    
    @IsNotEmpty()
    @ValidateNested()
    @IsObject()
    @Type(() => UsuarioAvaliador)
    UsuarioAvaliador: UsuarioAvaliador;

}

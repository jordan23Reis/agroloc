import { AvaliacaoSchemaDtoRestraints, AvaliacaoTipos } from "@agroloc/shared/util";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateAvaliacaoDto {
    @IsNotEmpty()
    @IsInt()
    @Min(AvaliacaoSchemaDtoRestraints.minNivelAvaliacao)
    @Max(AvaliacaoSchemaDtoRestraints.maxNivelAvaliacao)
    Nivel: number;

    @IsOptional()
    @IsString()
    @MinLength(AvaliacaoSchemaDtoRestraints.tamMinComentarioAvaliacao)
    @MaxLength(AvaliacaoSchemaDtoRestraints.tamMaxComentarioAvaliacao)
    Comentario: string;
    
    // @IsNotEmpty()
    // @IsString()
    // @MinLength( AvaliacaoSchemaDtoRestraints.tamMinIdUsuarioAvaliador)
    // @MaxLength( AvaliacaoSchemaDtoRestraints.tamMaxIdUsuarioAvaliador)
    // idUsuarioAvaliador: mongoose.Schema.Types.ObjectId;

}

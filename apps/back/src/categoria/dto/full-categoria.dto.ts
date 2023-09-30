import { CategoriaSchemaDtoRestraints, CategoriaTipos } from "@agroloc/shared/util";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";



export class FullCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(CategoriaSchemaDtoRestraints.tamMinNomeCategoria)
    @MaxLength(CategoriaSchemaDtoRestraints.tamMaxNomeCategoria)
    Nome: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(CategoriaSchemaDtoRestraints.tamMinTipo)
    @MaxLength(CategoriaSchemaDtoRestraints.tamMaxTipo)
    @IsEnum(CategoriaTipos)
    Tipo: string;
}

import { CategoriaSchemaDtoRestraints, CategoriaTipos } from "@agroloc/shared/util";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";



export class UpdateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(CategoriaSchemaDtoRestraints.tamMinNomeCategoria)
    @MaxLength(CategoriaSchemaDtoRestraints.tamMaxNomeCategoria)
    Nome: string;
}

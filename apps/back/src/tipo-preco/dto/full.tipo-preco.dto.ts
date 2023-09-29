import { PrecoSchemaDtoRestraints } from "@agroloc/shared/util";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class FullTipoPrecoDto {

    @IsNotEmpty()
    @MinLength(PrecoSchemaDtoRestraints.tamMinNome)
    @MaxLength(PrecoSchemaDtoRestraints.tamMaxNome)
    @IsString()
    Nome: string
}

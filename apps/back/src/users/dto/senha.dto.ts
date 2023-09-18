import { UsuarioSchemaDtoRestraints } from "@agroloc/shared/util";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class Senha{
    @IsNotEmpty()
    @IsString()
    @MinLength(UsuarioSchemaDtoRestraints.tamMinSenha)
    @MaxLength(UsuarioSchemaDtoRestraints.tamMaxSenha)
    Senha: string;
}
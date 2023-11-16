import { ProcessoDeAluguelSchemaDtoRestraints, ProcessoDeAluguelTiposRecebimento } from "@agroloc/shared/util";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class PagamentoDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(ProcessoDeAluguelSchemaDtoRestraints.minQuantificadorPreco)
    @Max(ProcessoDeAluguelSchemaDtoRestraints.maxQuantificadorPreco)
    QuantificadorPreco: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ProcessoDeAluguelTiposRecebimento)
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinTipoRecebimento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxTipoRecebimento)
    TipoRecebimento: string;

}

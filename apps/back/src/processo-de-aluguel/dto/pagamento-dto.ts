import { ProcessoDeAluguelSchemaDtoRestraints, ProcessoDeAluguelTiposRecebimento } from "@agroloc/shared/util";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

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

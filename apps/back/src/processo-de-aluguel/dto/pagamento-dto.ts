import { ProcessoDeAluguelSchemaDtoRestraints } from "@agroloc/shared/util";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

export class PagamentoDto {
    @IsOptional()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinLinkPagamento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxLinkPagamento)
    LinkPagamento: string;

    @IsOptional()
    @IsNumber()
    @Min(ProcessoDeAluguelSchemaDtoRestraints.minValorPagamento)
    @Max(ProcessoDeAluguelSchemaDtoRestraints.maxValorPagamento)
    Valor: number;

    @IsOptional()
    @IsNumber()
    @Min(ProcessoDeAluguelSchemaDtoRestraints.minQuantificadorPreco)
    @Max(ProcessoDeAluguelSchemaDtoRestraints.maxQuantificadorPreco)
    QuantificadorPreco: number;

    @IsOptional()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinTipoRecebimento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxTipoRecebimento)
    TipoRecebimento: string
}

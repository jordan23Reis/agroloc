import { ProcessoDeAluguelSchemaDtoRestraints } from "@agroloc/shared/util";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Imagem{
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinUrlImagem)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxUrlImagem)
    Url: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeArquivoImagem)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeArquivoImagem)
    NomeArquivo: string;
}

class Locador {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinIdLocador)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdLocador)
    idLocador: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeLocador)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeLocador)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    Foto: Imagem;
}

class Locatario {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinIdLocatario)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdLocatario)
    idLocatario: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeLocatario)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeLocatario)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    Foto: Imagem;
}

class Envolvidos {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Locador)
    Locador: Locador;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Locatario)
    Locatario: Locatario;
}

class Maquina {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinIdMaquina)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdMaquina)
    idMaquina: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeMaquina)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeMaquina)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    ImagemPrincipal: Imagem;
}

class Tipo {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinIdTipo)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdTipo)
    idTipo: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeTipo)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeTipo)
    Nome: string;
}

class Preco {
    @IsNotEmpty()
    @IsNumber()
    @Min(ProcessoDeAluguelSchemaDtoRestraints.minValorPorTipoPreco)
    @Max(ProcessoDeAluguelSchemaDtoRestraints.maxValorPorTipoPreco)
    ValorPorTipo: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Tipo)
    Tipo: Tipo;
}

class PixRecebedor {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinChavePix)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxChavePix)
    Chave: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinTipoPix)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxTipoPix)
    Tipo: string;
}

class ContaBancariaRecebedor {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinAgenciaPagamento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxAgenciaPagamento)
    Agencia: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinContaPagamento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxContaPagamento)
    Conta: string;
}

class Pagamento {
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
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinStatusPagamento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxStatusPagamento)
    Status: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Preco)
    Preco: Preco;

    @IsOptional()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinTipoRecebimento)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxTipoRecebimento)
    TipoRecebimento: string

    @IsOptional()
    @ValidateNested()
    @Type(() => PixRecebedor)
    PixRecebedor: PixRecebedor;

    @IsOptional()
    @ValidateNested()
    @Type(() => ContaBancariaRecebedor)
    ContaBancariaRecebedor: ContaBancariaRecebedor;
}

export class CreateProcessoDeAluguelDto {
    @IsOptional()
    @IsDateString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinDataInicio)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxDataInicio)
    DataInicio: Date;

    @IsOptional()
    @IsDateString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinDataTermino)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxDataTermino)
    DataTermino: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeAluguelSchemaDtoRestraints.tamMinStatus)
    @MaxLength(ProcessoDeAluguelSchemaDtoRestraints.tamMaxStatus)
    Status: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Pagamento)
    Pagamento: Pagamento;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Maquina)
    Maquina: Maquina;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Envolvidos)
    Envolvidos: Envolvidos;
}

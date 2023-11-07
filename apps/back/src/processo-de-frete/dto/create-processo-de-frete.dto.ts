import { ProcessoDeFreteSchemaDtoRestraints } from "@agroloc/shared/util";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Imagem{
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinUrlImagem)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxUrlImagem)
    Url: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinNomeArquivoImagem)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeArquivoImagem)
    NomeArquivo: string;
}

class Solicitante {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinIdSolicitante)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxIdSolicitante)
    idSolicitante: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinNomeSolicitante)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeSolicitante)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    Foto: Imagem;
}

class Freteiro {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinIdFreteiro)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxIdFreteiro)
    idFreteiro: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinNomeFreteiro)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeFreteiro)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    Foto: Imagem;
}

class Envolvidos {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Solicitante)
    Solicitante: Solicitante;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Freteiro)
    Freteiro: Freteiro;
}

class Maquina {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinIdMaquina)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxIdMaquina)
    idMaquina: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinNomeMaquina)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeMaquina)
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    ImagemPrincipal: Imagem;
}

class Tipo {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinIdTipo)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxIdTipo)
    idTipo: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinNomeTipo)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeTipo)
    Nome: string;
}

class Preco {
    @IsNotEmpty()
    @IsNumber()
    @Min(ProcessoDeFreteSchemaDtoRestraints.minValorPorTipoPreco)
    @Max(ProcessoDeFreteSchemaDtoRestraints.maxValorPorTipoPreco)
    ValorPorTipo: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Tipo)
    Tipo: Tipo;
}

class PixRecebedor {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinChavePix)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxChavePix)
    Chave: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinTipoPix)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxTipoPix)
    Tipo: string;
}

class ContaBancariaRecebedor {
    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinAgenciaPagamento)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxAgenciaPagamento)
    Agencia: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinContaPagamento)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxContaPagamento)
    Conta: string;
}

class Pagamento {
    @IsOptional()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinLinkPagamento)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxLinkPagamento)
    LinkPagamento: string;

    @IsOptional()
    @IsNumber()
    @Min(ProcessoDeFreteSchemaDtoRestraints.minValorPagamento)
    @Max(ProcessoDeFreteSchemaDtoRestraints.maxValorPagamento)
    Valor: number;

    @IsOptional()
    @IsNumber()
    @Min(ProcessoDeFreteSchemaDtoRestraints.minQuantificadorPreco)
    @Max(ProcessoDeFreteSchemaDtoRestraints.maxQuantificadorPreco)
    QuantificadorPreco: number;

    @IsOptional()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinStatusPagamento)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxStatusPagamento)
    Status: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Preco)
    Preco: Preco;

    @IsOptional()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinTipoRecebimento)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxTipoRecebimento)
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

class Veiculo{
    @IsNotEmpty()
    @IsString()
    idVeiculo: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    Nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Imagem)
    ImagemPrincipal: Imagem;
}

export class CreateProcessoDeFreteDto {
    @IsOptional()
    @IsDateString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinDataInicio)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxDataInicio)
    DataInicio: Date;

    @IsOptional()
    @IsDateString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinDataTermino)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxDataTermino)
    DataTermino: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinStatus)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxStatus)
    Status: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinCep)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxCep)
    CepOrigem: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(ProcessoDeFreteSchemaDtoRestraints.tamMinCep)
    @MaxLength(ProcessoDeFreteSchemaDtoRestraints.tamMaxCep)
    CepDestino: string;

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

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Veiculo)
    Veiculo: Veiculo;
}

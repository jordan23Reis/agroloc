import { ProcessoDeFreteSchemaDtoRestraints } from "@agroloc/shared/util";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProcessoDeFreteDocument = HydratedDocument<ProcessoDeFrete>;

@Schema()
class Imagem{
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinUrlImagem,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxUrlImagem
    })
    Url: string;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinNomeArquivoImagem,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeArquivoImagem
    })
    NomeArquivo: string;
}

@Schema()
class Solicitante {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Usuario",
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinIdSolicitante,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxIdSolicitante
    })
    idSolicitante: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinNomeSolicitante,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeSolicitante
    })
    Nome: string;

    @Prop({
        type: Imagem, 
        required: false,
    })
    Foto: Imagem;
}

@Schema()
class Freteiro {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Usuario",
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinIdFreteiro,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxIdFreteiro
    })
    idFreteiro: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinNomeFreteiro,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeFreteiro
    })
    Nome: string;

    @Prop({
        type: Imagem, 
        required: false,
    })
    Foto: Imagem;
}

@Schema()
class Envolvidos {
    @Prop({
        type: Solicitante, 
        required: true,
    })
    Solicitante: Solicitante;

    @Prop({
        type: Freteiro, 
        required: true,
    })
    Freteiro: Freteiro;
}

@Schema()
class Maquina {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Maquina",
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinIdMaquina,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxIdMaquina
    })
    idMaquina: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinNomeMaquina,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeMaquina
    })
    Nome: string;

    @Prop({
        type: Imagem, 
        required: false,
    })
    ImagemPrincipal: Imagem;
}

@Schema()
class Tipo {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"TipoPreco",
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinIdTipo,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxIdTipo,
    })
    idTipo: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinNomeTipo,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeTipo,
    })
    Nome: string;
}

@Schema()
class Preco {
    @Prop({
        type: Number, 
        required: true,
        min: ProcessoDeFreteSchemaDtoRestraints.minValorPorTipoPreco,
        max: ProcessoDeFreteSchemaDtoRestraints.maxValorPorTipoPreco,
    })
    ValorPorTipo: number;

    @Prop({
        type: Tipo, 
        required: false,
    })
    Tipo: Tipo;
}

@Schema()
class PixRecebedor {
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinChavePix,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxChavePix,
    })
    Chave: string;
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinTipoPix,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxTipoPix,
    })
    Tipo: string;
}

@Schema()
class ContaBancariaRecebedor {
    
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinAgenciaPagamento,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxAgenciaPagamento,
    })
    Agencia: string;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinContaPagamento,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxContaPagamento,
    })
    Conta: string;
}

@Schema()
class Pagamento {

    @Prop({
        type: String, 
        required: false,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinLinkPagamento,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxLinkPagamento,
    })
    LinkPagamento: string;

    @Prop({
        type: Number, 
        required: false,
        min: ProcessoDeFreteSchemaDtoRestraints.minValorPagamento,
        max: ProcessoDeFreteSchemaDtoRestraints.maxValorPagamento,
    })
    Valor: number;

    @Prop({
        type: Number, 
        required: false,
        min: ProcessoDeFreteSchemaDtoRestraints.minQuantificadorPreco,
        max: ProcessoDeFreteSchemaDtoRestraints.maxQuantificadorPreco,
    })
    QuantificadorPreco: number;

    @Prop({
        type: String, 
        required: false,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinStatusPagamento,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxStatusPagamento,
    })
    Status: string;

    // @Prop({
    //     type: Preco, 
    //     required: true
    // })
    // Preco: Preco;

    @Prop({
        type: String, 
        required: false,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinTipoRecebimento,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxTipoRecebimento,
    })
    TipoRecebimento: string;

    @Prop({
        type: PixRecebedor, 
        required: false
    })
    PixRecebedor: PixRecebedor;

    @Prop({
        type: ContaBancariaRecebedor, 
        required: false
    })
    ContaBancariaRecebedor: ContaBancariaRecebedor;
}

@Schema()
class Veiculo {
    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinIdVeiculo,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxIdVeiculo
    })
    idVeiculo: mongoose.Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinNomeVeiculo,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxNomeVeiculo
    })
    Nome: string;

    @Prop({
        type: Imagem,
        required: false
    })
    ImagemPrincipal: Imagem
}

@Schema({timestamps: true})
export class ProcessoDeFrete {
    @Prop({
        type: Date, 
        required: false,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinDataInicio,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxDataInicio,
    })
    DataInicio: Date;

    @Prop({
        type: Date, 
        required: false,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinDataTermino,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxDataTermino,
    })
    DataTermino: Date;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinStatus,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxStatus,
    })
    Status: string;

    @Prop({
        type: String,
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinCep,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxCep,
    })
    CepOrigem: string;

    @Prop({
        type: String,
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinCep,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxCep,
    })
    CepDestino: string;

    @Prop({
        type: Pagamento, 
        required: true
    })
    Pagamento: Pagamento;

    @Prop({
        type: Maquina, 
        required: true
    })
    Maquina: Maquina;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"ProcessoDeAluguel",
        required: true,
        minlength: ProcessoDeFreteSchemaDtoRestraints.tamMinIdProcessoDeAluguel,
        maxlength: ProcessoDeFreteSchemaDtoRestraints.tamMaxIdProcessoDeAluguel
    })
    idProcessoDeAluguel: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: Envolvidos, 
        required: true
    })
    Envolvidos: Envolvidos;

    @Prop({
        type: Veiculo,
        required: false
    })
    Veiculo: Veiculo
}

export const ProcessoDeFreteSchema = SchemaFactory.createForClass(ProcessoDeFrete);
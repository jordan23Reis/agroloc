import { ProcessoDeAluguelSchemaDtoRestraints } from "@agroloc/shared/util";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProcessoDeAluguelDocument = HydratedDocument<ProcessoDeAluguel>;

@Schema()
class Imagem{
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinUrlImagem,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxUrlImagem
    })
    Url: string;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeArquivoImagem,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeArquivoImagem
    })
    NomeArquivo: string;
}

@Schema()
class Locador {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Usuario",
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinIdLocador,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdLocador
    })
    idLocador: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeLocador,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeLocador
    })
    Nome: string;

    @Prop({
        type: Imagem, 
        required: false,
    })
    Foto: Imagem;
}

@Schema()
class Locatario {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Usuario",
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinIdLocatario,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdLocatario
    })
    idLocatario: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeLocatario,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeLocatario
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
        type: Locador, 
        required: true,
    })
    Locador: Locador;

    @Prop({
        type: Locatario, 
        required: true,
    })
    Locatario: Locatario;
}

@Schema()
class Maquina {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Maquina",
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinIdMaquina,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdMaquina
    })
    idMaquina: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeMaquina,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeMaquina
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
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinIdTipo,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxIdTipo,
    })
    idTipo: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinNomeTipo,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxNomeTipo,
    })
    Nome: string;
}

@Schema()
class Preco {
    @Prop({
        type: Number, 
        required: true,
        min: ProcessoDeAluguelSchemaDtoRestraints.minValorPorTipoPreco,
        max: ProcessoDeAluguelSchemaDtoRestraints.maxValorPorTipoPreco,
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
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinChavePix,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxChavePix,
    })
    Chave: string;
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinTipoPix,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxTipoPix,
    })
    Tipo: string;
}

@Schema()
class ContaBancariaRecebedor {
    
    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinAgenciaPagamento,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxAgenciaPagamento,
    })
    Agencia: string;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinContaPagamento,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxContaPagamento,
    })
    Conta: string;
}

@Schema()
class Pagamento {

    @Prop({
        type: String, 
        required: false,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinLinkPagamento,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxLinkPagamento,
    })
    LinkPagamento: string;

    @Prop({
        type: Number, 
        required: false,
        min: ProcessoDeAluguelSchemaDtoRestraints.minValorPagamento,
        max: ProcessoDeAluguelSchemaDtoRestraints.maxValorPagamento,
    })
    Valor: number;

    @Prop({
        type: Number, 
        required: false,
        min: ProcessoDeAluguelSchemaDtoRestraints.minQuantificadorPreco,
        max: ProcessoDeAluguelSchemaDtoRestraints.maxQuantificadorPreco,
    })
    QuantificadorPreco: number;

    @Prop({
        type: String, 
        required: false,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinStatusPagamento,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxStatusPagamento,
    })
    Status: string;

    @Prop({
        type: Preco, 
        required: true
    })
    Preco: Preco;

    @Prop({
        type: String, 
        required: false,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinTipoRecebimento,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxTipoRecebimento,
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

@Schema({timestamps: true})
export class ProcessoDeAluguel {
    @Prop({
        type: Date, 
        required: false,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinDataInicio,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxDataInicio,
    })
    DataInicio: Date;

    @Prop({
        type: Date, 
        required: false,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinDataTermino,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxDataTermino,
    })
    DataTermino: Date;

    @Prop({
        type: String, 
        required: true,
        minlength: ProcessoDeAluguelSchemaDtoRestraints.tamMinStatus,
        maxlength: ProcessoDeAluguelSchemaDtoRestraints.tamMaxStatus,
    })
    Status: string;


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
        type: Envolvidos, 
        required: true
    })
    Envolvidos: Envolvidos;
}

export const ProcessoDeAluguelSchema = SchemaFactory.createForClass(ProcessoDeAluguel);
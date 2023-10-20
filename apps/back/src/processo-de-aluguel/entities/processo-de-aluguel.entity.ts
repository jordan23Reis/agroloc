import { ProcessoDeAluguelSchemaDtoRestraints } from "@agroloc/shared/util";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MaquinaDocument = HydratedDocument<ProcessoDeAluguel>;

@Schema()
class Imagem{
    Url: string;
    NomeArquivo: string;
}

@Schema()
class Locador {
    idLocador: mongoose.Schema.Types.ObjectId;
    Nome: string;
    Foto: Imagem;
}

@Schema()
class Locatario {
    idLocatario: mongoose.Schema.Types.ObjectId;
    Nome: string;
    Foto: Imagem;
}

@Schema()
class Envolvidos {
    Locador: Locador;
    Locatario: Locatario;
}

@Schema()
class Maquina {
    idMaquina: mongoose.Schema.Types.ObjectId;
    Nome: string;
    ImagemPrincipal: Imagem;
}

@Schema()
class Tipo {
    idTipo: mongoose.Schema.Types.ObjectId;
    Nome: string;
}

@Schema()
class Preco {
    ValorPorTipo: number;
    Tipo: Tipo;
}

@Schema()
class Pagamento {
    TipoPagamento: string;
    Valor: number;
    QuantificadorPreco: number;
    Status: string;
    Preco: Preco;
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
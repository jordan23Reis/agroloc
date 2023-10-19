import { SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MaquinaDocument = HydratedDocument<ProcessoDeAluguel>;

class Imagem{
    Url: string;
    NomeArquivo: string;
}

class Locador {
    idLocador: mongoose.Schema.Types.ObjectId;
    Nome: string;
    Foto: Imagem;
}

class Locatario {
    idLocatario: mongoose.Schema.Types.ObjectId;
    Nome: string;
    Foto: Imagem;
}

class Envolvidos {
    Locador: Locador;
    Locatario: Locatario;
}

class Maquina {
    idMaquina: mongoose.Schema.Types.ObjectId;
    Nome: string;
    ImagemPrincipal: Imagem;
}

class Tipo {
    idTipo: mongoose.Schema.Types.ObjectId;
    Nome: string;
}

class Preco {
    ValorPorTipo: number;
    Tipo: Tipo;
}

class Pagamento {
    TipoPagamento: string;
    Valor: number;
    QuantificadorPreco: number;
    Status: string;
    Preco: Preco;
}

export class ProcessoDeAluguel {
    DataInicio: Date;
    DataTermino: Date;
    Status: string;
    Pagamento: Pagamento;
    Maquina: Maquina;
    Envolvidos: Envolvidos;
}

export const ProcessoDeAluguelSchema = SchemaFactory.createForClass(ProcessoDeAluguel);
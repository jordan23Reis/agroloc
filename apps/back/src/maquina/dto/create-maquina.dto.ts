import mongoose from "mongoose";


class Tipo {
    _id: mongoose.Schema.Types.ObjectId;    
    Nome: string
}

class Preco {
    ValorPorTipo: string
    Tipo: Tipo;
}

class Endereco {
    Cep: string
    Cidade: string
    Bairro: string
    Logradouro: string
    Complemento: string
    Numero: number
}

class Categoria{
    _id: mongoose.Schema.Types.ObjectId;
    Nome: string
}

class DonoDaMaquina {
    _id: mongoose.Schema.Types.ObjectId;
    Nome: string
    Foto: string
}

export class CreateMaquinaDto {
    Nome: string;
    Descricao: string;
    Peso: number;
    Comprimento: number;
    Largura: number;
    Altura: number;
    Imagens: string[];
    EstaAtiva: boolean;
    DataDeCriacao: Date;
    Avaliacoes: mongoose.Schema.Types.ObjectId[];
    DonoDaMaquina: DonoDaMaquina;
    Categoria: Categoria;
    Endereco: Endereco;
    Preco: Preco;
}

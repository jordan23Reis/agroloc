import mongoose from "mongoose";

export class CreateMaquinaDto {
    Nome: string;
    Descricao: string;
    Peso: number;
    Comprimento: number;
    Largura: number;
    Altura: number;
    Imagens: Array<string>;
    EstaAtiva: boolean;
    DataDeCriacao: Date;
    // Avaliacoes: mongoose.Schema.Types.ObjectId;
    Avaliacoes: Array<string>;
    DonoDaMaquina: object;
    Categoria: object;
    Endereco: object;
    Preco: object;
}

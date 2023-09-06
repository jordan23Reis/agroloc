import mongoose from "mongoose";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, validate } from '@nestjs/class-validator';



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
    @IsNotEmpty()
    @IsString()
    Nome: string;

    @IsNotEmpty()
    @IsString()
    Descricao: string;

    @IsNumber()
    Peso: number;

    @IsNumber()
    Comprimento: number;

    @IsNumber()
    Largura: number;

    @IsNumber()
    Altura: number;

    @IsArray()
    @IsString({each: true})
    Imagens: string[];

    @IsNotEmpty()
    @IsBoolean()
    EstaAtiva: boolean;

    @IsString()
    Avaliacoes: mongoose.Schema.Types.ObjectId[];

    DonoDaMaquina: DonoDaMaquina;
    Categoria: Categoria;
    Endereco: Endereco;
    Preco: Preco;
}

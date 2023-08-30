import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsString } from '@nestjs/class-validator';

export type MaquinaDocument = HydratedDocument<Maquina>;

@Schema()


export class Tipo {

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TipoPreco'})
  // _id: TipoPreco
  @Prop()
  Nome: string

}

export class Preco {
    @Prop()
    ValorPorTipo: string
    @Prop({type: Tipo})
    Tipo: Tipo;
}

export class Endereco {
  @Prop()
  Cep: string
  @Prop()
  Cidade: string
  @Prop()
  Bairro: string
  @Prop()
  Logradouro: string
  @Prop()
  Complemento: string
  @Prop()
  Numero: number
}

export class Categoria {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
  // _id: Categoria
  @Prop()
  Nome: string
}

export class DonoDaMaquina {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
  // _id: Usuario

  @Prop()
  Nome: string
  @Prop()
  Foto: string
}

export class Maquina {

  @Prop()
  @IsString()
  Nome: string;

  @Prop()
  Descricao: string;

  @Prop()
  Peso: number;

  @Prop()
  Comprimento: number;

  @Prop()
  Largura: number;

  @Prop()
  Altura: number;

  @Prop()
  Imagens: Array<string>;

  @Prop()
  EstaAtiva: boolean;

  @Prop()
  DataDeCriacao: Date;

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop()
  // Avaliacoes: Avaliacoes[]

  @Prop({type: Categoria})
  DonoDaMaquina: object;

  @Prop({type: Categoria})
  Categoria: Categoria;

  @Prop({type: Endereco})
  Endereco: Endereco;

  @Prop({type: Preco})
  Preco: Preco;

}

export const MaquinaSchema = SchemaFactory.createForClass(Maquina);
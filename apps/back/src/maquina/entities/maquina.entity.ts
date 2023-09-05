import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsString, MinLength } from '@nestjs/class-validator';

export type MaquinaDocument = HydratedDocument<Maquina>;

@Schema()
class Tipo {

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TipoPreco'})
  // _id: TipoPreco
  @Prop()
  Nome: string

}

@Schema()
class Preco {
    @Prop()
    ValorPorTipo: string
    @Prop({type: Tipo})
    Tipo: Tipo;
}

@Schema()
class Endereco {
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

@Schema()
class Categoria {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
  // _id: Categoria
  @Prop()
  Nome: string
}

@Schema()
class DonoDaMaquina {
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

@Schema()
export class Maquina {

  @Prop({required: true, minlength: 3, maxlength: 50})
  Nome: string;

  @Prop({required: true})
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
  Imagens: string[];

  @Prop()
  EstaAtiva: boolean;

  @Prop()
  DataDeCriacao: Date;

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop()
  // Avaliacoes: Avaliacoes[]

  @Prop({type: DonoDaMaquina})
  DonoDaMaquina: DonoDaMaquina;

  @Prop({type: Categoria})
  Categoria: Categoria;

  @Prop({type: Endereco})
  Endereco: Endereco;

  @Prop({type: Preco})
  Preco: Preco;

}

export const MaquinaSchema = SchemaFactory.createForClass(Maquina);
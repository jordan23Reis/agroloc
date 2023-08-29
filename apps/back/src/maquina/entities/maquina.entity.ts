import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MaquinaDocument = HydratedDocument<Maquina>;

@Schema()


export class Tipo {
    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TipoPreco'})
    // _id: TipoPreco

    // @

}

export class Preco {
    @Prop()
    _id: mongoose.Schema.Types.ObjectId

    @Prop({type: Tipo})
    Tipo: Tipo;
}

export class Maquina {
  @Prop()
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

  // a fazer avaliacoes
//   @Prop()
//   Avaliacoes: Avaliacoes[]

  @Prop()
  DonoDaMaquina: object;

  @Prop()
  Categoria: object;

  @Prop()
  Endereco: object;

  @Prop({type: Preco})
  Preco: Preco;

}







export const MaquinaSchema = SchemaFactory.createForClass(Maquina);
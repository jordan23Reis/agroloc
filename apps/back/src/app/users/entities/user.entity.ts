import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Categoria {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
  // _id: Categoria
  @Prop()
  Nome: string;
}

@Schema()
export class Automovel {//estou exportando a class automovel para ser usada
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
  @Prop({ type: Categoria })
  Categoria: Categoria;
}

@Schema()
export class CadastroFreteiro {
  @Prop()
  CNH: string;
  @Prop({ type: Automovel })// aqui o type faz referência ao padrão do nest
  Automovel: Automovel;
}

@Schema()
export class Usuario {
  @Prop({ type: CadastroFreteiro })
  CadastroFreteiro: CadastroFreteiro;
}

export const MaquinaSchema = SchemaFactory.createForClass(Usuario);

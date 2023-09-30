
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CategoriaSchemaDtoRestraints, CategoriaTipos } from '@agroloc/shared/util';

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema({timestamps: true})
export class Categoria {
  @Prop({
    required:true, 
    type: String,
    minlength: CategoriaSchemaDtoRestraints.tamMinNomeCategoria, 
    maxlength: CategoriaSchemaDtoRestraints.tamMaxNomeCategoria
})
  Nome: string;

  @Prop({
    required:true,
    type: String,
    minlength: CategoriaSchemaDtoRestraints.tamMinTipo,
    maxlength: CategoriaSchemaDtoRestraints.tamMaxTipo,
    enum: [CategoriaTipos.Automovel, CategoriaTipos.Maquina]
})
  Tipo: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
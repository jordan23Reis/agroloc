import { PrecoSchemaDtoRestraints } from "@agroloc/shared/util";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type TipoPrecoDocument = HydratedDocument<TipoPreco>;

export class TipoPreco {
    @Prop({
        minlength: PrecoSchemaDtoRestraints.tamMinNome,
        maxlength: PrecoSchemaDtoRestraints.tamMaxNome,
        type: String,
        required: true
    })
    Nome: string
}

export const TipoPrecoSchema = SchemaFactory.createForClass(TipoPreco);
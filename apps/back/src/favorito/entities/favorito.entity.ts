import { FavoritoSchemaDtoRestraints } from "@agroloc/shared/util";
import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type FavoritoDocument = HydratedDocument<Favorito>;

@Schema()
export class ImagemPrincipal{
    @Prop({
        type: String,
        required: true,
        minlength: FavoritoSchemaDtoRestraints.tamMinUrlImagem,
        maxlength:FavoritoSchemaDtoRestraints.tamMaxUrlImagem
    })
    Url: string;
    @Prop({
        type: String, 
        required: true,
        minlength: FavoritoSchemaDtoRestraints.tamMinNomeArquivo,
        maxlength: FavoritoSchemaDtoRestraints.tamMaxNomeArquivo
    })
    NomeArquivo: string;
}

@Schema()
export class ItemFavorito{
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        minlength: FavoritoSchemaDtoRestraints.tamMinIdItemFavorito,
        maxlength: FavoritoSchemaDtoRestraints.tamMaxIdItemFavorito
    })
    idItemFavorito: mongoose.Schema.Types.ObjectId;
    @Prop({
        type: String, 
        required: true,
        minlength: FavoritoSchemaDtoRestraints.tamMinNomeItem,
        maxlength: FavoritoSchemaDtoRestraints.tamMaxNomeItem
    })
    Nome: string;
    @Prop({
        type: String, 
        required: true,
        minlength: FavoritoSchemaDtoRestraints.tamMinTipo,
        maxlength: FavoritoSchemaDtoRestraints.tamMaxTipo
    })
    Tipo: string;
    @Prop({
        type: ImagemPrincipal
    })
    ImagemPrincipal: ImagemPrincipal
}

@Schema({timestamps: true})
export class Favorito {

@Prop({type: ItemFavorito, required: true})
ItemFavorito: ItemFavorito
}




export const FavoritoSchema = SchemaFactory.createForClass(Favorito);

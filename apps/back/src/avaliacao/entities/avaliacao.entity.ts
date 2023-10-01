import { AvaliacaoSchemaDtoRestraints, AvaliacaoTipos } from '@agroloc/shared/util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AvaliacaoDocument = HydratedDocument<Avaliacao>;


@Schema()
class Foto{
    @Prop({
        required: true,
        type: String,  
        minlength: AvaliacaoSchemaDtoRestraints.tamMinUrlImagem, 
        maxlength: AvaliacaoSchemaDtoRestraints.tamMaxUrlImagem
      })
      Url: string;
    
      @Prop({
        required: true,
        type: String,  
        minlength: AvaliacaoSchemaDtoRestraints.tamMinArquivoImagem, 
        maxlength: AvaliacaoSchemaDtoRestraints.tamMaxArquivoImagem
      })
      NomeArquivo: string;
}

@Schema()
class UsuarioAvaliador{
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        minlength: AvaliacaoSchemaDtoRestraints.tamMinIdUsuarioAvaliador,
        maxlength: AvaliacaoSchemaDtoRestraints.tamMaxIdUsuarioAvaliador
    })
    idUsuarioAvaliador: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String, 
        required: true,
        minlength: AvaliacaoSchemaDtoRestraints.tamMinNome,
        maxlength: AvaliacaoSchemaDtoRestraints.tamMaxNome
    })
    Nome: string;

    @Prop({
        type: Foto,
        required: false
    })
    Foto: Foto;

}

@Schema({timestamps: true})
export class Avaliacao {
    @Prop({
        type: Number, 
        required: true, 
        min: AvaliacaoSchemaDtoRestraints.minNivelAvaliacao, 
        max: AvaliacaoSchemaDtoRestraints.maxNivelAvaliacao
    })
    Nivel: number;

    @Prop({
        type: String, 
        required: true, 
        enum: AvaliacaoTipos,
    })
    Tipo: string;

    @Prop({
        type: String, 
        required: false, 
        minlength: AvaliacaoSchemaDtoRestraints.tamMinComentarioAvaliacao,
        maxlength: AvaliacaoSchemaDtoRestraints.tamMaxComentarioAvaliacao,
    })
    Comentario: string;

    @Prop({
        type: UsuarioAvaliador, 
        required: true
    })
    UsuarioAvaliador: UsuarioAvaliador;
}

export const AvaliacaoSchema = SchemaFactory.createForClass(Avaliacao);
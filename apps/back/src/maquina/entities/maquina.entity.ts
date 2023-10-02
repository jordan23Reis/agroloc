import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {AvaliacaoSchemaDtoRestraints, MaquinaSchemaDtoRestraints } from "@agroloc/shared/util"
import { Usuario } from '../../users/entities/user.entity';
import { TipoPreco } from '../../tipo-preco/entities/tipo-preco.entity';
import { Categoria as catEntity } from '../../categoria/entities/categoria.entity';
import { Avaliacao } from '../../avaliacao/entities/avaliacao.entity';

export type MaquinaDocument = HydratedDocument<Maquina>;

@Schema()
class Tipo {

  @Prop({
  required: true, type: mongoose.Schema.Types.ObjectId, ref: 'TipoPreco' 
  })
  idTipo: TipoPreco
  @Prop({
    required: true,
    type: String,  
    minlength: MaquinaSchemaDtoRestraints.tamMinTipo, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxTipo  
  })
  Nome: string

}

@Schema()
class Preco {
  @Prop({
    required: true,
    type: Number,  
    min: MaquinaSchemaDtoRestraints.ValorPorTipoMin, 
    max: MaquinaSchemaDtoRestraints.ValorPorTipoMax,
  })
  ValorPorTipo: number
  @Prop({type: Tipo})
  Tipo: Tipo;
}

@Schema()
class Endereco {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    minlength: MaquinaSchemaDtoRestraints.tamMinIdEndereco, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxIdEndereco
  })
  idEndereco: mongoose.Schema.Types.ObjectId

  @Prop({
    required: true, 
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinCep, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxCep
  })
  Cep: string

  @Prop({
    required: true, 
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinEstado, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxEstado
  })
  Estado: string

  @Prop({
    required: true, 
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinCidade, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxCidade
  })
  Cidade: string

  @Prop({
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinBairro, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxBairro
  })
  Bairro: string

  @Prop({
    required: true, 
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinLogradouro, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxLogradouro
  })
  Logradouro: string

  @Prop({
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinComplemento, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxComplemento
  })
  Complemento: string

  @Prop({
    type: Number,
    min: MaquinaSchemaDtoRestraints.numeroMin, 
    max: MaquinaSchemaDtoRestraints.numeroMax
  })
  Numero: number
}

@Schema()
class Categoria {
  @Prop({ 
  required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' 
  })
  idCategoria: catEntity

  @Prop({
    required: true,
    type: String,  
    minlength: MaquinaSchemaDtoRestraints.tamMinCategoria, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxCategoria
  })
  Nome: string
}

@Schema()
class DonoDaMaquina {
  @Prop({ 
  required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' 
  })
  idDono: Usuario

  @Prop({
    required: true,
    type: String,  
    minlength: MaquinaSchemaDtoRestraints.tamMinNomeDonoMaquina, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxNomeDonoMaquina
  })
  Nome: string

  @Prop({
    type: String,  
    minlength: MaquinaSchemaDtoRestraints.tamMinFoto, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxFoto
  })
  Foto: string
}

@Schema()
class Imagem{
  @Prop({
    required: true,
    type: String,  
    minlength: MaquinaSchemaDtoRestraints.tamMinImagem, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxImagem
  })
  Url: string;

  @Prop({
    required: true,
    type: String,  
    minlength: MaquinaSchemaDtoRestraints.tamMinImagem, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxImagem
  })
  NomeArquivo: string;
}

@Schema({ timestamps: true })
export class Maquina {

  @Prop({
    required: true, 
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinNomeMaquina, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxNomeMaquina
  })
  Nome: string;

  @Prop({
    required: true,
    type: String,
    minlength: MaquinaSchemaDtoRestraints.tamMinDescricaoMaquina, 
    maxlength: MaquinaSchemaDtoRestraints.tamMaxDescricaoMaquina
  })
  Descricao: string;

  @Prop({
    type: Number,
    min: MaquinaSchemaDtoRestraints.pesoMinMaquina, 
    max: MaquinaSchemaDtoRestraints.pesoMaxMaquina
  })
  Peso: number;

  @Prop({
    type: Number,
    min: MaquinaSchemaDtoRestraints.comprimentoMinMaquina, 
    max: MaquinaSchemaDtoRestraints.comprimentoMaxMaquina
  })
  Comprimento: number;

  @Prop({
    type: Number,
    min: MaquinaSchemaDtoRestraints.larguraMinMaquina, 
    max: MaquinaSchemaDtoRestraints.larguraMaxMaquina
  })
  Largura: number;

  @Prop({
    type: Number,
    min: MaquinaSchemaDtoRestraints.alturaMinMaquina, 
    max: MaquinaSchemaDtoRestraints.alturaMaxMaquina
  })
  Altura: number;

  @Prop({type: Imagem})
  ImagemPrincipal: Imagem;

  @Prop([{ type: Imagem }])
  ImagensSecundarias: Imagem[];

  @Prop({ 
    required: true,
    type: Boolean,
    default: true,
  })
  EstaAtiva: boolean;

  @Prop({
   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Avaliacao' }]
  })
  Avaliacoes: Avaliacao[]

  @Prop({
    type: Number, 
    min:AvaliacaoSchemaDtoRestraints.minNivelAvaliacao, 
    max:AvaliacaoSchemaDtoRestraints.maxNivelAvaliacao
  })
  NotaGeral: number;

  @Prop({
    type: DonoDaMaquina, 
    required: true
  })
  DonoDaMaquina: DonoDaMaquina;

  @Prop({
    type: Categoria
  })
  Categoria: Categoria;

  @Prop({
    type: Endereco, 
    required: false
  })
  Endereco: Endereco;

  @Prop({
    type: Preco, 
    required: true
  })
  Preco: Preco;

}

export const MaquinaSchema = SchemaFactory.createForClass(Maquina);
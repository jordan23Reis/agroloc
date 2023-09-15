import { UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
class Categoria {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
  // idCategoria: Categoria
  @Prop()
  Nome: string;
}

@Schema()
class Automovel {
  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinNomeAutomovel,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNomeAutomovel,
  })
  Nome: string;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinDescricaoAutomovel,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxDescricaoAutomovel,
  })
  Descricao: string;

  @Prop({
    type: Number,
    minlength: UsuarioSchemaDtoRestraints.pesoMinAutomovel,
    maxlength: UsuarioSchemaDtoRestraints.pesoMaxAutomovel,
  })
  Peso: number;

  @Prop({
    type: Number,
    minlength: UsuarioSchemaDtoRestraints.comprimentoMinAutomovel,
    maxlength: UsuarioSchemaDtoRestraints.comprimentoMaxAutomovel,
  })
  Comprimento: number;

  @Prop({
    type: Number,
    minlength: UsuarioSchemaDtoRestraints.larguraMinAutomovel,
    maxlength: UsuarioSchemaDtoRestraints.larguraMaxAutomovel,
  })
  Largura: number;

  @Prop({
    type: Number,
    minlength: UsuarioSchemaDtoRestraints.alturaMinAutomovel,
    maxlength: UsuarioSchemaDtoRestraints.alturaMaxAutomovel,
  })
  Altura: number;

  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinAutomovelImagemtamMinUsuarioImagem,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxAutomovelImagemtamMinUsuarioImagem,
  })
  Imagens: Array<string>;

  @Prop({ type: Categoria })
  Categoria: Categoria;
}

//depois que crio a classe e insiro os atributos eu preciso chamar a @Prop({ type: + nome da classe})
// se for um array preciso coloca-lo dentro de [] ex: depois na linha posterior
//chamar a classe novamente e atribuir a classe ex: @Prop({ type: [Automovel] })
//CadastroComum: CadastroComum;

@Schema()
class CadastroFreteiro {
  @Prop()
  CNH: string;
  @Prop({ type: [Automovel] }) // aqui o type faz referência ao padrão do nest
  Automovel: Automovel[];
}

@Schema()
class Enderecos {
  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinCep,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxCep,
  })
  Cep: string;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinNomeCidade,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNomeCidade,
  })
  Cidade: string;

  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinNomeBairro,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNomeBairro,
  })
  Bairro: string;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinLogradouro,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxLogradouro,
  })
  Logradouro: string;

  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinComplemento,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxComplemento,
  })
  Complemento: string;

  @Prop({
    type: Number,
    minlength: UsuarioSchemaDtoRestraints.tamMinNumero,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNumero,
  })
  Numero: number;
}

@Schema()
class Imagem {
  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinUsuarioImagem,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxUsuarioImagem,
  })
  Url: string;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinUsuarioImagem,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxUsuarioImagem,
  })
  NomedoArquivo: string;
}

@Schema()
class CadastroComum {
  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinNome,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNome,
  })
  Nome: string;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinSobrenome,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxSobrenome,
  })
  Sobrenome: string;

  /* @Prop({
  required: true,
  type: Date,
  minlength: ,
  maxlength: ,
  })
  DataDeNascimento: Date; */

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinSexo,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxSexo,
  })
  Sexo: string;

  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinNumeroTelefone,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNumeroTelefone,
  })
  Telefone: Array<string>;

  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinCpf,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxCpf,
  })
  Cpf: string;

  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinCnpj,
    maxlenght: UsuarioSchemaDtoRestraints.tamMaxCnpj,
  })
  Cnpj: string;

  @Prop({type: Imagem})
  Imagem: Imagem

  @Prop({ type: [Enderecos] })
  Enderecos: [Enderecos];
}

@Schema()
class Pix {
  @Prop({
    required: true,
    type: String,
  })
  Chave: string;

  @Prop({
    required: true,
    type: String,
  })
  Tipo: string;
}
@Schema()
class ContaBancaria {
  @Prop({
    required: true,
    type: String,
  })
  Agencia: string;

  @Prop({
    required: true,
    type: String,
  })
  Conta: string;
}
@Schema()
class InformacoesBancarias {
  @Prop({ type: ContaBancaria })
  ContaBancaria: ContaBancaria;
  @Prop({ type: Pix })
  Pix: Pix;
}
@Schema()
class Login {
  @Prop({
    required: true,
    type: String,
  })
  Email: string;

  @Prop({
    required: true,
    type: String,
  })
  Senha: string;

  @Prop({
    required: true,
    type: String,
  })
  Salt: string;

  @Prop({
    required: true,
    type: String,
  })
  Tipo: string;
}
@Schema()
export class Usuario {
  @Prop({ type: CadastroComum })
  CadastroComum: CadastroComum;

  @Prop({ type: CadastroFreteiro })
  CadastroFreteiro: CadastroFreteiro;

  @Prop({ type: Login })
  Login: Login;

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maquina' }] })
  // Maquinas: Maquina[];

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorito' }] })
  // Favoritos: Favorito[];

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProcessoDeAluguel' }] })
  // MaquinasAlugadas: ProcessoDeAluguel[];

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProcessoDeAluguel' }] })
  // MaquinasLocadas: ProcessoDeAluguel[];

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProcessoDeFrete' }] })
  // FretesRealizados: ProcessoDeFrete[];

  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProcessoDeFrete' }] })
  // FretesSolicitados: ProcessoDeFrete[];
  @Prop({ type: InformacoesBancarias })
  InformacoesBancarias: InformacoesBancarias;
}

export const UserSchema = SchemaFactory.createForClass(Usuario);

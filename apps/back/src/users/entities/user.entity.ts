import { AvaliacaoSchemaDtoRestraints, UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Maquina } from '../../maquina/entities/maquina.entity';
import { Favorito } from '../../favorito/entities/favorito.entity';
import { Categoria as catEntity } from '../../categoria/entities/categoria.entity';
import { Avaliacao } from '../../avaliacao/entities/avaliacao.entity';


export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
class Categoria {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    minlength: UsuarioSchemaDtoRestraints.tamMinIdCategoria,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxIdCategoria,
  })
  idCategoria: catEntity
  @Prop({
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinCategoria,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxCategoria,
  })
  Nome: string;
}

@Schema()
class Imagem {
  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinUrlImagem,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxUrlImagem,
  })
  Url: string;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinArquivoImagem,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxArquivoImagem,
  })
  NomeArquivo: string;
}

@Schema()
class Automovel {
  @Prop({type: mongoose.Types.ObjectId, required:false})
  _id: mongoose.Types.ObjectId;

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

  @Prop({ type: Imagem })
  ImagemPrincipal: Imagem;

  @Prop([{ type: Imagem }])
  ImagensSecundarias: Imagem[];

  @Prop({ type: Categoria })
  Categoria: Categoria;
}

@Schema()
class EnderecoComId {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    minlength: UsuarioSchemaDtoRestraints.tamMinIdEndereco, 
    maxlength: UsuarioSchemaDtoRestraints.tamMaxIdEndereco
  })
  idEndereco: mongoose.Schema.Types.ObjectId

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
    minlength: UsuarioSchemaDtoRestraints.tamMinNomeEstado,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNomeEstado,
  })
  Estado: string;

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


//depois que crio a classe e insiro os atributos eu preciso chamar a @Prop({ type: + nome da classe})
// se for um array preciso coloca-lo dentro de [] ex: depois na linha posterior
//chamar a classe novamente e atribuir a classe ex: @Prop({ type: [Automovel] })
//CadastroComum: CadastroComum;

@Schema()
class CadastroFreteiro {
  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  EstaAtivo: boolean;
  @Prop({
    type: String,
    required: true,
    minlength: UsuarioSchemaDtoRestraints.tamMinCnh,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxCnh,
  })
  CNH: string;

  @Prop({
    type: Number, 
    min:AvaliacaoSchemaDtoRestraints.minNivelAvaliacao, 
    max:AvaliacaoSchemaDtoRestraints.maxNivelAvaliacao
  })
  NotaGeral: number;

  @Prop([{ type: Automovel }]) // aqui o type faz referência ao padrão do nest
  Automovel: Automovel[];
  
  @Prop({type: EnderecoComId})
  EnderecoAtivo: EnderecoComId

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Avaliacao' }]
   })
   Avaliacoes: Avaliacao[]

}




@Schema()
class Enderecos {
  @Prop({type: mongoose.Types.ObjectId, required:false})
  _id: mongoose.Types.ObjectId;

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
    minlength: UsuarioSchemaDtoRestraints.tamMinNomeEstado,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxNomeEstado,
  })
  Estado: string;

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

  @Prop({
    required: true,
    type: Date,
    minlength: UsuarioSchemaDtoRestraints.tamMinDataNascimento,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxDataNascimento,
  })
  DataDeNascimento: Date;

  @Prop({
    required: true,
    type: String,
    minlength: UsuarioSchemaDtoRestraints.tamMinSexo,
    maxlength: UsuarioSchemaDtoRestraints.tamMaxSexo,
  })
  Sexo: string;

  @Prop([
    {
      type: String,
      minlength: UsuarioSchemaDtoRestraints.tamMinNumeroTelefone,
      maxlength: UsuarioSchemaDtoRestraints.tamMaxNumeroTelefone,
    },
  ])
  Telefone: string[];

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

  @Prop({ type: Imagem })
  Foto: Imagem;

  @Prop([{ type: Enderecos }])
  Enderecos: Enderecos[];
}

@Schema()
class Pix {
  @Prop({
    minlength: UsuarioSchemaDtoRestraints.tamMinChavePix,
    maxlenght: UsuarioSchemaDtoRestraints.tamMaxChavePix,
    required: true,
    type: String,
  })
  Chave: string;

  @Prop({
    minlength: UsuarioSchemaDtoRestraints.tamMinTipoPix,
    maxlenght: UsuarioSchemaDtoRestraints.tamMaxTipoPix,
    required: true,
    type: String,
  })
  Tipo: string;
}
@Schema()
class ContaBancaria {
  @Prop({
    minlength: UsuarioSchemaDtoRestraints.tamMinAgenciaContaBancaria,
    maxlenght: UsuarioSchemaDtoRestraints.tamMaxAgenciaContaBancaria,
    required: true,
    type: String,
  })
  Agencia: string;

  @Prop({
    minlength: UsuarioSchemaDtoRestraints.tamMinContaContaBancaria,
    maxlenght: UsuarioSchemaDtoRestraints.tamMaxContaContabancaria,
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
    min: UsuarioSchemaDtoRestraints.tamMinEmail,
    max: UsuarioSchemaDtoRestraints.tamMaxEmail,
    unique: true
  })
  Email: string;

  @Prop({
    required: true,
    type: String,
    min: UsuarioSchemaDtoRestraints.tamMinSenha,
    max: UsuarioSchemaDtoRestraints.tamMaxSenha,
  })
  Senha: string;



  @Prop({
    required: true,
    type: String,
    min: UsuarioSchemaDtoRestraints.tamMinTipo,
    max: UsuarioSchemaDtoRestraints.tamMaxTipo,
  })
  Tipo: string;
}

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ type: CadastroComum })
  CadastroComum: CadastroComum;

  @Prop({ type: CadastroFreteiro })
  CadastroFreteiro: CadastroFreteiro;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maquina' }] })
  Maquinas: Maquina[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorito' }] })
  MaquinasFavoritas: Favorito[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorito' }] })
  FreteirosFavoritos: Favorito[];

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

  @Prop({ type: Login, required: true })
  Login: Login;

  @Prop({ type: InformacoesBancarias })
  InformacoesBancarias: InformacoesBancarias;
}

export const UserSchema = SchemaFactory.createForClass(Usuario);



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
class Categoria {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
  // _id: Categoria
  @Prop()
  Nome: string;
}

@Schema()
class Automovel {
  //estou exportando a class automovel para ser usada
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
  @Prop()
  Cep: string;
  @Prop()
  Cidade: string;
  @Prop()
  Bairro: string;
  @Prop()
  Logradouro: string;
  @Prop()
  Complemento: string;
  @Prop()
  Numero: number;
}
@Schema()
class CadastroComum {
  @Prop()
  NomeCompleto: string;
  @Prop()
  DataDeNascimento: Date;
  @Prop()
  Sexo: string;
  @Prop()
  Telefone: Array<string>;
  @Prop()
  Cpf: string;
  @Prop()
  Cnpj: string;
  @Prop()
  Foto: string;
  @Prop({ type: [Enderecos] })
  Enderecos: [Enderecos];
}
@Schema()
class Pix {
  @Prop()
  Chave: string;
  @Prop()
  Tipo: string;
}
@Schema()
class ContaBancaria {
  @Prop()
  Agencia: string;
  @Prop()
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
  @Prop()
  UserName: string;
  @Prop()
  Email: string;
  @Prop()
  Senha: string;
  @Prop()
  Salt: string;
  @Prop()
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

export const MaquinaSchema = SchemaFactory.createForClass(Usuario);

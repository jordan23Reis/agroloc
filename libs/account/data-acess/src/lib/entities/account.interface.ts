import moongose from 'mongoose';

class Pix {
  Chave: string;
  Tipo: string;
}

class ContaBancaria {
  Agencia: string;
  Conta: string;
}

class InformacoesBancarias {
  ContaBancaria: ContaBancaria;
  Pix: Pix;
}

class Login {
  UserName: string;
  Email: string;
  Senha: string;
  Salt: string;
  Tipo: string;
}

class Automovel {
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  Imagens: string[];
}

class CadastroFreteiro {
  CNH: string;
  Automovel: Automovel[];
}

class Endereco {
  Cep: string;
  Cidade: string;
  Bairro: string;
  Logradouro: string;
  Complemento: string;
  Numero: number;
}

class CadastroComum {
  NomeCompleto: string;
  DataDeNascimento: Date;
  Sexo: string;
  Telefone: string[];
  Cpf: string;
  Cnpj: string;
  Foto: string;
  Endereco: Endereco;
}

export class Account {
  CadastroComun: CadastroComum;
  CadastroFreteiro: CadastroFreteiro;
  Maquinas: moongose.Types.ObjectId[];
  Favoritos: moongose.Types.ObjectId[];
  MaquinasAlugadas: moongose.Types.ObjectId[];
  MaquinasLocadas: moongose.Types.ObjectId[];
  FretesRealizados: moongose.Types.ObjectId[];
  FretesSolicitados: moongose.Types.ObjectId[];
  Login: Login;
  InformacoesBancarias: InformacoesBancarias;
}

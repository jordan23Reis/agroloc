// Representa os dados de login
interface Login {
  Email: string;
  Senha: string;
  Tipo: string;
}

// Representa os dados do usuário
export interface Account {
  Login: Login;
  CadastroComum?: CadastroComum;
  CadastroFreteiro?: CadastroFreteiro;
  Maquinas?: string[];
  MaquinasFavoritas?: string[];
  FreteirosFavoritos?: string[];
  MaquinasAlugadas?: string[];
  MaquinasLocadas?: string[];
  FretesRealizados?: string[];
  FretesSolicitados?: string[];
  InformacoesBancarias?: InformacoesBancarias;
}

// Representa os dados do cadastro comum
interface CadastroComum {
  Nome: string;
  Sobrenome: string;
  DataDeNascimento: string;
  Sexo: string;
  Telefone?: string[];
  Cpf?: string;
  Cnpj?: string;
  Enderecos?: Address[];
  Foto?: Imagem;
}

// Representa os dados do cadastro de freteiro
interface CadastroFreteiro {
  CNH: string;
  Automovel?: Automovel[];
}

// Representa os dados de endereço
interface Address {
  _id: string;
  Cep: string;
  Estado: string;
  Cidade: string;
  Logradouro: string;
  Bairro?: string;
  Complemento?: string;
  Numero: number;
}

// Representa os dados de um automóvel
interface Automovel {
  Nome: string;
  Descricao: string;
  Peso?: number;
  Comprimento?: number;
  Largura?: number;
  Altura?: number;
  ImagemPrincipal?: Imagem;
  ImagensSecundarias?: Imagem[];
  Categoria?: Categoria;
}

// Representa os dados de uma imagem
interface Imagem {
  Url: string;
  NomeArquivo: string;
}

// Representa os dados de uma categoria
interface Categoria {
  idCategoria?: string;
  Nome?: string;
}

// Representa os dados de informações bancárias
export interface InformacoesBancarias {
  ContaBancaria?: ContaBancaria;
  Pix?: Pix;
}

// Representa os dados de conta bancária
export interface ContaBancaria {
  Agencia: string;
  Conta: string;
}

// Representa os dados de PIX
export interface Pix {
  Chave: string;
  Tipo: string;
}

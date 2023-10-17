// Representa os dados de login
export interface Login {
  Email: string;
  Senha: string;
  Tipo: string;
}

// Representa os dados do usuário
export interface Account {
  Login: Login;
  CadastroComum: CadastroComum;
  CadastroFreteiro: CadastroFreteiro;
  Maquinas: Machine[];
  Favoritos: Favorito[];
  MaquinasAlugadas: Machine[];
  MaquinasLocadas: Machine[];
  FretesRealizados: Frete[];
  FretesSolicitados: Frete[];
  InformacoesBancarias: InformacoesBancarias;
}

// Representa os dados do cadastro comum
export interface CadastroComum {
  Nome: string;
  Sobrenome: string;
  DataDeNascimento: string;
  Sexo: string;
  Telefone: string[];
  Cpf: string;
  Cnpj: string;
  Enderecos: Address[];
  Foto: Imagem;
}

// Representa os dados do cadastro de freteiro
export interface CadastroFreteiro {
  CNH: string;
  Automovel: Automovel[];
}

// Representa os dados de endereço
export interface Address {
  Cep: string;
  Cidade: string;
  Logradouro: string;
  Bairro: string;
  Complemento: string;
  Numero: number;
}

// Representa os dados de um automóvel
export interface Automovel {
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  ImagemPrincipal: Imagem;
  ImagensSecundarias: Imagem[];
  Categoria: Categoria;
}

// Representa os dados de uma imagem
export interface Imagem {
  Url: string;
  NomeArquivo: string;
}

// Representa os dados de uma categoria
export interface Categoria {
  idCategoria: string;
  Nome: string;
}

// Representa os dados de favoritos
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Favorito {
  // Adicione os campos apropriados para favoritos, se necessário
}

// Representa os dados de máquina
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Machine {
  // Adicione os campos apropriados para máquinas, se necessário
}

// Representa os dados de informações bancárias
export interface InformacoesBancarias {
  ContaBancaria: ContaBancaria;
  Pix: Pix;
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

// Representa os dados de um frete
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Frete {
  // Adicione os campos apropriados para fretes, se necessário
}

// aaaaaaaaaa

// Interface para os dados da conta Comum
export interface CadastroComum {
  Nome: string;
  Sobrenome: string;
  DataDeNascimento: string;
  Sexo: string;
  Telefone: string[];
  Cpf: string;
  Cnpj: string;
}

// Interface para os dados da conta Freteiro
export interface CadastroFreteiro {
  EstaAtivo: boolean;
  CNH: string;
  IdEndereco: string;
}

// Interface para os dados da conta completa (pode ser Comum ou Freteiro)
export interface AccountData {
  CadastroComum?: CadastroComum;
  CadastroFreteiro?: CadastroFreteiro;
}

export interface UpdatePassword {
  Senha: string;
}

export interface Imagem {
  Imagem: File; // Nome do arquivo deve ser "Imagem"
}

export interface InformacoesBancarias {
  ContaBancaria: ContaBancaria;
  Pix: Pix;
}

export interface ContaBancaria {
  Agencia: string;
  Conta: string;
}

export interface Pix {
  Chave: string;
  Tipo: string;
}

export interface Automovel {
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  idCategoria: string;
}

export interface EditAutomovel {
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  idCategoria: string;
}

export interface ImagemPrincipal {
  Imagem: File; // Nome do arquivo deve ser "Imagem"
}

export interface ImagensSecundarias {
  Imagens: File[];
}

export interface NovoEndereco {
  Cep: string;
  Estado: string;
  Cidade: string;
  Logradouro: string;
  Bairro: string;
  Complemento: string;
  Numero: number;
}

export interface EditarEndereco {
  Cep: string;
  Estado: string;
  Cidade: string;
  Logradouro: string;
  Bairro: string;
  Complemento: string;
  Numero: number;
}

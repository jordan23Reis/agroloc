interface Imagem {
  Url: string;
  NomeArquivo: string;
  _id: string;
}

interface Categoria {
  idCategoria: string;
  Nome: string;
  _id: string;
}

interface Veiculo {
  _id: string;
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  ImagemPrincipal: Imagem;
  ImagensSecundarias?: Imagem[];
  Categoria: Categoria;
}

interface CadastroComum {
  Nome: string;
  Sobrenome: string;
  DataDeNascimento: string;
  Sexo: string;
  Telefone: any[]; // Você pode definir um tipo mais específico para os números de telefone, se necessário
  _id: string;
  Enderecos: any[]; // Você pode definir um tipo mais específico para os endereços, se necessário
}

interface CadastroFreteiro {
  EstaAtivo: boolean;
  CNH: string;
  Automovel: Veiculo[];
  Avaliacoes: any[]; // Você pode definir um tipo mais específico para as avaliações, se necessário
  _id: string;
}

interface Usuario {
  _id: string;
  CadastroComum: CadastroComum;
  CadastroFreteiro: CadastroFreteiro;
  Maquinas: any[]; // Você pode definir um tipo mais específico para as máquinas, se necessário
  MaquinasFavoritas: any[]; // Você pode definir um tipo mais específico para as máquinas favoritas, se necessário
  FreteirosFavoritos: any[]; // Você pode definir um tipo mais específico para os freteiros favoritos, se necessário
  createdAt: string;
  updatedAt: string;
  __v: number;
}

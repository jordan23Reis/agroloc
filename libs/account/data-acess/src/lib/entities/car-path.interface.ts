export interface Automovel {
  _id?: string;
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

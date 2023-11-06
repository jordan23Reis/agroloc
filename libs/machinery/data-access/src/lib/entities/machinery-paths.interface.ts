export interface Preco {
  ValorPorTipo: number;
  idTipo: string;
}

export interface Machinery {
  _id?: string;
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  EstaAtiva: boolean;
  idCategoria: string;
  IdEndereco: string;
  Preco: Preco;
}

export interface TipoPreco {
  Nome: string;
}

export interface Categoria {
  _id?: string;
  Nome: string;
  Tipo: string;
}

export interface UpdateCategoria {
  Nome: string;
}

export interface Avaliacao {
  Nivel: number;
  Comentario: string;
}

export interface Preco {
  ValorPorTipo: number;
  idTipo: string;
}

export interface Machinery {
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  EstaAtiva: boolean;
  IdCategoria: string;
  IdEndereco: string;
  Preco: Preco;
}

export interface TipoPreco {
  Nome: string;
}

export interface Categoria {
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

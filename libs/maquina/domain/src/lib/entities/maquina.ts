class Tipo {
  //====================================
  //A IMPLEMENTAR
  //====================================
  // idTipo: TipoPreco

  Nome: string;
}

class Preco {
  ValorPorTipo: number;
  Tipo: Tipo;
}

class Endereco {
  Cep: string;

  Cidade: string;

  Bairro: string;

  Logradouro: string;

  Complemento: string;

  Numero: number;
}

class Categoria {
  //====================================
  //A IMPLEMENTAR
  //====================================

  // idCategoria: Categoria

  Nome: string;
}

class DonoDaMaquina {
  //====================================
  //A IMPLEMENTAR
  //====================================

  // idDono: Usuario

  Nome: string;

  Foto: string;
}

class Imagem {
  Url: string;

  NomeArquivo: string;
}

export class Maquina {
  Nome: string;

  Descricao: string;

  Peso: number;

  Comprimento: number;

  Largura: number;

  Altura: number;

  ImagemPrincipal: Imagem;

  ImagensSecundarias: Imagem[];

  EstaAtiva: boolean;

  //====================================
  //A IMPLEMENTAR
  //====================================
  // Avaliacoes: Avaliacoes[]

  DonoDaMaquina: DonoDaMaquina;
  Categoria: Categoria;

  Endereco: Endereco;

  Preco: Preco;
}

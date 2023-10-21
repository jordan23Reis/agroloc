export interface Imagem {
  Imagem: File;
}

export interface UpdatePassword {
  Senha: string;
}

export interface ImagemPrincipal {
  Imagem: File;
}

export interface ImagensSecundarias {
  Imagens: File[];
}

export interface NovoEndereco {
  Cep: string;
  Estado: string;
  Cidade: string;
  Logradouro: string;
  Bairro?: string;
  Complemento?: string;
  Numero?: number;
}

export interface EditarEndereco {
  Cep: string;
  Estado: string;
  Cidade: string;
  Logradouro: string;
  Bairro?: string;
  Complemento?: string;
  Numero?: number;
}

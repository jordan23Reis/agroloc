import { Document } from 'mongoose';

interface Tipo {
  _id: string;
  idTipo: string;
  Nome: string;
}

interface Preco {
  _id: string;
  ValorPorTipo: number;
  Tipo: Tipo;
}

interface Endereco {
  _id: string;
  idEndereco: string;
  Cep: string;
  Estado: string;
  Cidade: string;
  Bairro: string;
  Logradouro: string;
  Complemento: string;
  Numero: number;
}

interface Categoria {
  _id: string;
  idCategoria: string;
  Nome: string;
}

interface DonoDaMaquina {
  _id: string;
  idDono: string;
  Nome: string;
  Foto: string;
}

interface Imagem {
  _id: string;
  Url: string;
  NomeArquivo: string;
}

interface Foto {
  Url: string;
  NomeArquivo: string;
}

interface UsuarioAvaliador {
  idUsuarioAvaliador: string;
  Nome: string;
  Foto: Foto | null; // Pode ser nulo se não houver foto
}

interface Avaliacao {
  Nivel: number;
  Tipo: string;
  Comentario: string | null; // Pode ser nulo
  UsuarioAvaliador: UsuarioAvaliador;
  _id: string; // Identificador exclusivo gerado pelo Mongoose
}

export interface Maquina {
  _id: string;
  Nome: string;
  Descricao: string;
  Peso: number;
  Comprimento: number;
  Largura: number;
  Altura: number;
  ImagemPrincipal: Imagem;
  ImagensSecundarias: Imagem[];
  EstaAtiva: boolean;
  Avaliacoes: Avaliacao[];
  NotaGeral: number;
  DonoDaMaquina: DonoDaMaquina;
  Categoria: Categoria;
  Endereco: Endereco;
  Preco: Preco;
}

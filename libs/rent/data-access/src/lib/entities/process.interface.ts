interface Pagamento {
  Status: string;
  Valor?: number;
  Preco: {
    ValorPorTipo: number;
    Tipo: {
      idTipo: string;
      Nome: string;
      _id: string;
    };
    _id: string;
  };
  PixRecebedor: {
    Chave: string;
    Tipo: string;
    _id: string;
  };
  ContaBancariaRecebedor: {
    Agencia: string;
    Conta: string;
    _id: string;
  };
  _id: string;
}

interface Maquina {
  idMaquina: string;
  Nome: string;
  _id: string;
}

interface Locador {
  idLocador: string;
  Nome: string;
  _id: string;
}

interface Locatario {
  idLocatario: string;
  Nome: string;
  _id: string;
}

interface Envolvidos {
  Locador: Locador;
  Locatario: Locatario;
  _id: string;
}

export interface AluguelProcesso {
  Status: string;
  Pagamento: Pagamento;
  Maquina: Maquina;
  Envolvidos: Envolvidos;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

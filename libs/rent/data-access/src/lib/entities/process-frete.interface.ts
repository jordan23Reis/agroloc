interface PixRecebedor {
  Chave: string;
  Tipo: string;
  _id: string;
}

interface ContaBancariaRecebedor {
  Agencia: string;
  Conta: string;
  _id: string;
}

interface Pagamento {
  Valor: number;
  Status: string;
  PixRecebedor: PixRecebedor;
  ContaBancariaRecebedor: ContaBancariaRecebedor;
  _id: string;
}

interface Maquina {
  idMaquina: string;
  Nome: string;
  _id: string;
}

interface Solicitante {
  idSolicitante: string;
  Nome: string;
  _id: string;
}

interface Freteiro {
  idFreteiro: string;
  Nome: string;
  _id: string;
}

interface Envolvidos {
  Solicitante: Solicitante;
  Freteiro: Freteiro;
  _id: string;
}

interface ProcessoDeFrete {
  _id: string;
  Status: string;
  CepOrigem: string;
  CepDestino: string;
  Pagamento: Pagamento;
  Maquina: Maquina;
  idProcessoDeAluguel: string;
  Envolvidos: Envolvidos;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default ProcessoDeFrete;

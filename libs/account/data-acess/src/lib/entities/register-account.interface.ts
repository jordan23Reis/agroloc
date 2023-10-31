// Interface para os dados da conta Comum
export interface CadastroComum {
    Nome: string;
    Sobrenome: string;
    DataDeNascimento: string;
    Sexo: string;
    Telefone?: string[];
    Cpf?: string;
    Cnpj?: string;
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
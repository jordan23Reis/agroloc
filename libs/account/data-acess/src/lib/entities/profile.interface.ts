export interface Profile {
  IdUsuario: string;
  EmailUsuario: string;
  TipoUsuario: string;
}

export enum accountTypes {
  Comum = 'Comum',
  Freteiro = 'Freteiro',
  Administrador = 'Administrador',
}

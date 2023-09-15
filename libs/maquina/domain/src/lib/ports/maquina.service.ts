import { Maquina } from '../entities/maquina';

export interface CreateImagemPrincipalResposta {
  message: string;
  urlFoto: string;
  nomeArquivo: string;
}

export abstract class MaquinaService {
  abstract findOne(id: string): Promise<Maquina | null>;

  abstract updateMaquina(
    id: string,
    parte: Partial<Maquina>
  ): Promise<Maquina | null>;

  abstract removeArquivoLocal(caminho: string, filename: string): void;
}

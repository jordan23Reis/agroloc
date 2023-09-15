import {
  MaquinaService,
} from '@agroloc/maquina/domain';
import { Model } from 'mongoose';
import { Maquina } from '@agroloc/maquina/domain';
import { unlinkSync } from 'fs';
import { join } from 'path';

export class MaquinaServiceImpl implements MaquinaService {
  constructor(private readonly maquinaModel: Model<Maquina>) {}

  findOne(id: string) {
    return this.maquinaModel.findById<Maquina>(id);
  }
  updateMaquina(id: string, parte: Partial<Maquina>) {
    return this.maquinaModel.findByIdAndUpdate(id, parte);
  }
  removeArquivoLocal(caminho: string, filename: string): void {
    unlinkSync(join(caminho, filename));
  }
}

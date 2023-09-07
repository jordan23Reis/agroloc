import { Injectable } from '@nestjs/common';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { Maquina } from './entities/maquina.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MaquinaService {
  constructor(@InjectModel(Maquina.name) private maquinaModel: Model<Maquina>){}

  create(createMaquinaDto: CreateMaquinaDto) {
    const createdMaquina = this.maquinaModel.create(createMaquinaDto);
    return createdMaquina;
  }

  findAll() {
    const listedMaquinas = this.maquinaModel.find({});
    return listedMaquinas;
  }

  findOne(id: string) {
    const foundMaquina = this.maquinaModel.findById(id);
    return foundMaquina;
  }

  update(id: string, updateMaquinaDto: UpdateMaquinaDto) {
    const updatedMaquina = this.maquinaModel.findByIdAndUpdate(id, updateMaquinaDto);
    return updatedMaquina;
  }

  remove(id: string) {
    const foundMaquina = this.maquinaModel.findByIdAndRemove(id);
    return foundMaquina;
  }
}

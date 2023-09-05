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
    return `This action returns all maquina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maquina`;
  }

  update(id: number, updateMaquinaDto: UpdateMaquinaDto) {
    return `This action updates a #${id} maquina`;
  }

  remove(id: number) {
    return `This action removes a #${id} maquina`;
  }
}

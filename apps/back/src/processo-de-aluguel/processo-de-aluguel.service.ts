import { Injectable } from '@nestjs/common';
import { CreateProcessoDeAluguelDto } from './dto/create-processo-de-aluguel.dto';
import { UpdateProcessoDeAluguelDto } from './dto/update-processo-de-aluguel.dto';

@Injectable()
export class ProcessoDeAluguelService {
  create(createProcessoDeAluguelDto: CreateProcessoDeAluguelDto) {
    return 'This action adds a new processoDeAluguel';
  }

  findAll() {
    return `This action returns all processoDeAluguel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processoDeAluguel`;
  }

  update(id: number, updateProcessoDeAluguelDto: UpdateProcessoDeAluguelDto) {
    return `This action updates a #${id} processoDeAluguel`;
  }

  remove(id: number) {
    return `This action removes a #${id} processoDeAluguel`;
  }
}

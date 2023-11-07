import { Injectable } from '@nestjs/common';
import { CreateProcessoDeFreteDto } from './dto/create-processo-de-frete.dto';

@Injectable()
export class ProcessoDeFreteService {
  create(createProcessoDeFreteDto: CreateProcessoDeFreteDto) {
    return 'This action adds a new processoDeFrete';
  }

  findAll() {
    return `This action returns all processoDeFrete`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processoDeFrete`;
  }



  remove(id: number) {
    return `This action removes a #${id} processoDeFrete`;
  }
}

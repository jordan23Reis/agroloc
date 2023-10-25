import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';
import { CreateProcessoDeAluguelDto } from './dto/create-processo-de-aluguel.dto';
import { UpdateProcessoDeAluguelDto } from './dto/update-processo-de-aluguel.dto';

@Controller('processo-de-aluguel')
export class ProcessoDeAluguelController {
  constructor(
    private readonly processoDeAluguelService: ProcessoDeAluguelService
  ) {}

  @Post(":idMaquina/:idLocador/:idLocatario")
  create(@Param('idMaquina') idMaquina: string, @Param('idLocador') idLocador: string, @Param('idLocatario') idLocatario: string) {
    return this.processoDeAluguelService.create(idMaquina, idLocador, idLocatario);
  }

  @Get()
  findAll() {
    return this.processoDeAluguelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoDeAluguelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessoDeAluguelDto: UpdateProcessoDeAluguelDto
  ) {
    return this.processoDeAluguelService.update(
      +id,
      updateProcessoDeAluguelDto
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processoDeAluguelService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessoDeFreteService } from './processo-de-frete.service';
import { CreateProcessoDeFreteDto } from './dto/create-processo-de-frete.dto';

@Controller('processo-de-frete')
export class ProcessoDeFreteController {
  constructor(
    private readonly processoDeFreteService: ProcessoDeFreteService
  ) {}

  @Post()
  create(@Body() createProcessoDeFreteDto: CreateProcessoDeFreteDto) {
    return this.processoDeFreteService.create(createProcessoDeFreteDto);
  }

  @Get()
  findAll() {
    return this.processoDeFreteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoDeFreteService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProcessoDeFreteDto: UpdateProcessoDeFreteDto
  // ) {
  //   return this.processoDeFreteService.update(+id, updateProcessoDeFreteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processoDeFreteService.remove(+id);
  }
}

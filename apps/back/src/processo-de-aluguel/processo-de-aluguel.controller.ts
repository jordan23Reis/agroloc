import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';
import { UpdateProcessoDeAluguelDto } from './dto/update-processo-de-aluguel.dto';
import { TipoPrecoGuard } from './guards/TipoPrecoGuard';
import { LocadorLocatarioGuard } from './guards/LocadorLocatarioGuard';
import { InformacoesBancariasLocadorGuard } from './guards/InformacoesBancariasLocadorGuard';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { MaquinaGuard } from './guards/MaquinaGuard';

@Controller('processo-de-aluguel')
export class ProcessoDeAluguelController {
  constructor(
    private readonly processoDeAluguelService: ProcessoDeAluguelService
  ) {}


  @UseGuards(JwtAuthGuard, MaquinaGuard, LocadorLocatarioGuard, TipoPrecoGuard, InformacoesBancariasLocadorGuard)
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

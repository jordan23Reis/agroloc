import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProcessoDeFreteService } from './processo-de-frete.service';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { VeiculoGuard } from './guards/VeiculoGuard';
import { FreteiroSolicitanteGuard } from './guards/FreteiroSolicitanteGuard';
import { ProcessoAAceitarJaExisteGuard } from './guards/ProcessoAAceitarJaExisteGuard';

@Controller('processo-de-frete')
export class ProcessoDeFreteController {
  constructor(
    private readonly processoDeFreteService: ProcessoDeFreteService
  ) {}

  // @UseGuards(JwtAuthGuard, VeiculoGuard, FreteiroSolicitanteGuard, ProcessoAAceitarJaExisteGuard, TipoPrecoGuard, InformacoesBancariasLocadorGuard )
  @Post(":idVeiculo/:idLocador/:idLocatario")
  create(@Param('idVeiculo') idVeiculo: string, @Param('idFreteiro') idFreteiro: string, @Param('idSolicitante') idSolicitante: string) {
    try{
    return this.processoDeFreteService.create(idVeiculo, idFreteiro, idSolicitante);
    }catch(e){
      return new Error(e.message);
    }
  }

  @Get()
  findAll() {
    return this.processoDeFreteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoDeFreteService.findOne(id);
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

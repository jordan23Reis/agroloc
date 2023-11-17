import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProcessoDeFreteService } from './processo-de-frete.service';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { VeiculoGuard } from './guards/VeiculoGuard';
import { FreteiroSolicitanteGuard } from './guards/FreteiroSolicitanteGuard';
import { ProcessoAAceitarJaExisteGuard } from './guards/ProcessoAAceitarJaExisteGuard';
import { MaquinaGuard } from './guards/MaquinaGuard';
import { InformacoesBancariasFreteiroGuard } from './guards/InformacoesBancariasFreteiroGuard';
import { UsuarioLogadoDonoDoProcessoGuard } from './guards/UsuarioLogadoDonoDoProcessoGuard';
import { ProcessoAAceitarGuard } from './guards/ProcessoAAceitarGuard';
import { ProcessoAComecarGuard } from './guards/ProcessoAComecarGuard';
import { ProcessoAFinalizarGuard } from './guards/ProcessoAFinalizarGuard';
import { ProcessoAPagarGuard } from './guards/ProcessoAPagarGuard';
import { ProcessoDeAluguelExisteGuard } from './guards/ProcessoDeAluguelExisteGuard';

@Controller('processo-de-frete')
export class ProcessoDeFreteController {
  constructor(
    private readonly processoDeFreteService: ProcessoDeFreteService
  ) {}

  @UseGuards(JwtAuthGuard, MaquinaGuard, FreteiroSolicitanteGuard, ProcessoAAceitarJaExisteGuard, InformacoesBancariasFreteiroGuard, ProcessoDeAluguelExisteGuard )
  @Post(":idProcessoDeAluguel/:idMaquina/:idFreteiro/:idSolicitante/:enderecoSolicitanteSelecionado/:valorFrete")
  create(
    @Param('idProcessoDeAluguel') idProcessoDeAluguel: string, 
    @Param('idMaquina') idMaquina: string, 
    @Param('idFreteiro') idFreteiro: string, 
    @Param('idSolicitante') idSolicitante: string, 
    @Param('enderecoSolicitanteSelecionado') enderecoSolicitanteSelecionado: string, 
    @Param('valorFrete') valorFrete: number) {
    try{
    return this.processoDeFreteService.create(idProcessoDeAluguel, idMaquina, idFreteiro, idSolicitante, enderecoSolicitanteSelecionado, valorFrete);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioLogadoDonoDoProcessoGuard, ProcessoAAceitarGuard, VeiculoGuard)
  @Patch("mudarstatus/aceitar/:idProcessoDeFrete/:idVeiculo")
  aceitarProcessoDeFrete(
    @Param('idProcessoDeFrete') idProcessoDeFrete: string,
    @Param('idVeiculo') idVeiculo: string){
    try{
      return this.processoDeFreteService.aceitarProcessoDeFrete(idProcessoDeFrete, idVeiculo);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioLogadoDonoDoProcessoGuard, ProcessoAAceitarGuard)
  @Patch("mudarstatus/recusar/:idProcessoDeFrete")
  recusarProcessoDeFrete(
    @Param('idProcessoDeFrete') idProcessoDeFrete: string){
    try{
      return this.processoDeFreteService.recusarProcessoDeFrete(idProcessoDeFrete);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioLogadoDonoDoProcessoGuard, ProcessoAComecarGuard)
  @Patch("mudarstatus/comecar/:idProcessoDeFrete")
  comecarProcessoDeFrete(
    @Param('idProcessoDeFrete') idProcessoDeFrete: string){
    try{
      return this.processoDeFreteService.comecarProcessoDeFrete(idProcessoDeFrete);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioLogadoDonoDoProcessoGuard, ProcessoAFinalizarGuard)
  @Patch("mudarstatus/finalizar/:idProcessoDeFrete")
  finalizarProcessoDeFrete(
    @Param('idProcessoDeFrete') idProcessoDeFrete: string){
    try{
      return this.processoDeFreteService.finalizarProcessoDeFrete(idProcessoDeFrete);
    }catch(e){
      return new Error(e.message);
    }
  }

  
  @UseGuards(JwtAuthGuard, UsuarioLogadoDonoDoProcessoGuard, ProcessoAPagarGuard)
  @Patch("mudarstatus/confirmarpagamento/:idProcessoDeFrete")
  confirmarPagamentoProcessoDeFrete(
    @Param('idProcessoDeFrete') idProcessoDeFrete: string){
    try{
      return this.processoDeFreteService.confirmarPagamentoProcessoDeFrete(idProcessoDeFrete);
    }catch(e){
      return new Error(e.message);
    }
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

}

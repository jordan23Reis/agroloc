import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';
import { UpdateProcessoDeAluguelDto } from './dto/update-processo-de-aluguel.dto';
import { TipoPrecoGuard } from './guards/TipoPrecoGuard';
import { LocadorLocatarioGuard } from './guards/LocadorLocatarioGuard';
import { InformacoesBancariasLocadorGuard } from './guards/InformacoesBancariasLocadorGuard';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { MaquinaGuard } from './guards/MaquinaGuard';
import { ProcessoAAceitarJaExisteGuard } from './guards/ProcessoAAceitarJaExisteGuard';
import { UsuarioLogadoDonoDoProcessoGuard } from './guards/UsuarioLogadoDonoDoProcessoGuard';
import { ProcessoAAceitarGuard } from './guards/ProcessoAAceitar';
import { ProcessoAguardandoFrete } from './guards/ProcessoAguardandoFrete';
import { ProcessoAComecar } from './guards/ProcessoAComecar';
import { ProcessoEmAndamentoOuARefazerPreco } from './guards/ProcessoEmAndamentoOuARefazerPreco';
import { PagamentoDto } from './dto/pagamento-dto';
import { UsuarioLogadoLocatarioDoProcessoGuard } from './guards/UsuarioLogadoLocatarioDoProcessoGuard';
import { ProcessoAConfirmarPreco } from './guards/ProcessoAConfirmarPreco';

@Controller('processo-de-aluguel')
export class ProcessoDeAluguelController {
  constructor(
    private readonly processoDeAluguelService: ProcessoDeAluguelService
  ) {}


  @UseGuards(JwtAuthGuard, MaquinaGuard, LocadorLocatarioGuard, ProcessoAAceitarJaExisteGuard, TipoPrecoGuard, InformacoesBancariasLocadorGuard )
  @Post(":idMaquina/:idLocador/:idLocatario")
  create(@Param('idMaquina') idMaquina: string, @Param('idLocador') idLocador: string, @Param('idLocatario') idLocatario: string) {
    try{
    return this.processoDeAluguelService.create(idMaquina, idLocador, idLocatario);
    }catch(e){
      throw new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAAceitarGuard, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/aceitar/:idProcessoDeAluguel")
  aceitarProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.aceitarProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      throw new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAguardandoFrete, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/pularfrete/:idProcessoDeAluguel")
  pularProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.pularFrete(idProcessoDeAluguel);
    }catch(e){
      throw new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAComecar, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/comecar/:idProcessoDeAluguel")
  comecarProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.comecarProcesso(idProcessoDeAluguel);
    }catch(e){
      throw new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoEmAndamentoOuARefazerPreco, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/concluir/:idProcessoDeAluguel")
  concluirProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string, @Body() pagamentoDto: PagamentoDto){
    try{
      return this.processoDeAluguelService.concluirProcessoDeAluguel(idProcessoDeAluguel, pagamentoDto);
    }catch(e){
      throw new Error(e.message);
    }
  }


  @UseGuards(JwtAuthGuard, ProcessoAConfirmarPreco, UsuarioLogadoLocatarioDoProcessoGuard)
  @Patch("mudarstatus/confirmarpreco/:idProcessoDeAluguel")
  confirmarPrecoProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.confirmarPrecoProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      throw new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAConfirmarPreco, UsuarioLogadoLocatarioDoProcessoGuard)
  @Patch("mudarstatus/recusarpreco/:idProcessoDeAluguel")
  recusarPrecoProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.recusarPrecoProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      throw new Error(e.message);
    }
  }

  @Get()
  findAll() {
    return this.processoDeAluguelService.findAll();
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

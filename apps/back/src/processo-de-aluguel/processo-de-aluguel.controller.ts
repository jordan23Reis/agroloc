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
import { ProcessoAguardandoSelecaoDeFrete } from './guards/ProcessoAguardandoSelecaoDeFrete';
import { ProcessoAComecar } from './guards/ProcessoAComecar';
import { ProcessoEmAndamento } from './guards/ProcessoEmAndamento';
import { PagamentoDto } from './dto/pagamento-dto';
import { UsuarioLogadoLocatarioDoProcessoGuard } from './guards/UsuarioLogadoLocatarioDoProcessoGuard';
import { ProcessoAConfirmarPreco } from './guards/ProcessoAConfirmarPreco';
import { ProcessoAPagar } from './guards/ProcessoAPagar';
import { ProcessoASelecionarPrecoOuRefazerPreco } from './guards/ProcessoASelecionarPreco';
import { UsuarioLogadoGuard } from './guards/UsuarioLogadoGuard';
import { UsuarioLogadoComumGuard } from './guards/UsuarioLogadoComum';

@Controller('processo-de-aluguel')
export class ProcessoDeAluguelController {
  constructor(
    private readonly processoDeAluguelService: ProcessoDeAluguelService
  ) {}



   @UseGuards(JwtAuthGuard, UsuarioLogadoGuard, UsuarioLogadoComumGuard)
   @Get("/necessitando-frete/:idUsuario")
   findAllProcessosDeAluguelNecessitandoFrete(@Param('idUsuario') idUsuario: string){
    try{
      return this.processoDeAluguelService.findAllProcessosDeAluguelNecessitandoFrete(idUsuario);
      }catch(e){
        return new Error(e.message);
      }
   } 



  @UseGuards(JwtAuthGuard, MaquinaGuard, LocadorLocatarioGuard, ProcessoAAceitarJaExisteGuard, TipoPrecoGuard, InformacoesBancariasLocadorGuard )
  @Post(":idMaquina/:idLocador/:idLocatario")
  create(@Param('idMaquina') idMaquina: string, @Param('idLocador') idLocador: string, @Param('idLocatario') idLocatario: string) {
    try{
    return this.processoDeAluguelService.create(idMaquina, idLocador, idLocatario);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAAceitarGuard, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/aceitar/:idProcessoDeAluguel")
  aceitarProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.aceitarProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAAceitarGuard, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/recusar/:idProcessoDeAluguel")
  recusarProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.recusarProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAguardandoSelecaoDeFrete, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/pularfrete/:idProcessoDeAluguel")
  pularProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.pularFrete(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAComecar, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/comecar/:idProcessoDeAluguel")
  comecarProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.comecarProcesso(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoEmAndamento, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/concluir/:idProcessoDeAluguel")
  concluirProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.concluirProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }


  @UseGuards(JwtAuthGuard, ProcessoASelecionarPrecoOuRefazerPreco, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/selecionarpreco/:idProcessoDeAluguel")
  selecionarPrecoProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string, @Body() pagamentoDto: PagamentoDto){
    try{
      return this.processoDeAluguelService.selecionarPreco(idProcessoDeAluguel, pagamentoDto);
    }catch(e){
      return new Error(e.message);
    }
  }


  @UseGuards(JwtAuthGuard, ProcessoAConfirmarPreco, UsuarioLogadoLocatarioDoProcessoGuard)
  @Patch("mudarstatus/confirmarpreco/:idProcessoDeAluguel")
  confirmarPrecoProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.confirmarPrecoProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAConfirmarPreco, UsuarioLogadoLocatarioDoProcessoGuard)
  @Patch("mudarstatus/recusarpreco/:idProcessoDeAluguel")
  recusarPrecoProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.recusarPrecoProcessoDeAluguel(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, ProcessoAPagar, UsuarioLogadoDonoDoProcessoGuard)
  @Patch("mudarstatus/confirmarpagamento/:idProcessoDeAluguel")
  confirmarPagamentoProcessoDeAluguel(@Param('idProcessoDeAluguel') idProcessoDeAluguel: string){
    try{
      return this.processoDeAluguelService.confirmarPagamentoProcessoAluguel(idProcessoDeAluguel);
    }catch(e){
      return new Error(e.message);
    }
  }


}

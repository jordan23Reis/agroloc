import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { UsuarioComumGuard } from '../users/guards/UsuarioComum';
import { UsuarioCorretoGuard } from '../users/guards/UsuarioCorretoGuard';
import { UsuarioExisteGuard } from '../users/guards/UsuarioExiste';
import { AvaliarMaquinaGuard } from './guards/avaliarMaquinaGuard';
import { AvaliacaoExisteGuard } from './guards/avaliacaoExisteGuard';
import { UsuarioDonoAvaliacao } from './guards/usuarioDonoAvaliacao';
import { Avaliacao } from './entities/avaliacao.entity';
import { AvaliarFreteiroGuard } from './guards/avaliarFreteiroGuard';
import { ProcessoDeAluguelExisteGuard } from './guards/processoAluguelExisteGuard';
import { ProcessoDeAluguelNaoAvaliadoGuard } from './guards/ProcessoDeAluguelNaoAvaliadoGuard';
import { ProcessoDeAluguelJaAvaliadoGuard } from './guards/ProcessoDeAluguelJaAvaliadoGuard';
import { UsuarioLocatarioDoProcessoGuard } from './guards/UsuarioLocatarioDoProcessoGuard';
import { ProcessoDeFreteExisteGuard } from './guards/processoFreteExisteGuard';
import { UsuarioSolicitanteDoProcessoGuard } from './guards/UsuarioSolicitanteDoProcessoGuard';
import { ProcessoDeFreteNaoAvaliadoGuard } from './guards/ProcessoDeFreteNaoAvaliadoGuard';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, AvaliarMaquinaGuard, ProcessoDeAluguelExisteGuard, UsuarioLocatarioDoProcessoGuard, ProcessoDeAluguelNaoAvaliadoGuard)
  @Post("maquina/:id/:idMaquina/:idProcessoDeAluguel")
  createAvaliacaoMaquina(
    @Param('id') idUsuarioAvaliador: string,
    @Param('idMaquina') idMaquina: string,
    @Param('idProcessoDeAluguel') idProcessoDeAluguel: string,
    @Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.criarAvaliacaoMaquina(idUsuarioAvaliador,idMaquina,createAvaliacaoDto, idProcessoDeAluguel);
  }

  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao)
  @Put('maquina/:idAvaliacao')
  updateAvaliacaoMaquina(
    @Param('idAvaliacao') idAvaliacao: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto
  ) {
    return this.avaliacaoService.editarAvaliacaoMaquina(idAvaliacao, updateAvaliacaoDto);
  }

  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao, ProcessoDeAluguelExisteGuard, ProcessoDeAluguelJaAvaliadoGuard)
  @Delete('maquina/:idAvaliacao/:idProcessoDeAluguel')
  removeAvaliacaoMaquina(
    @Param('idAvaliacao') idAvaliacao: Avaliacao, 
    @Param('idProcessoDeAluguel') idProcessoDeAluguel: string
  ) {
    return this.avaliacaoService.deletarAvaliacaoMaquina(idAvaliacao, idProcessoDeAluguel);
  }


  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, AvaliarFreteiroGuard, ProcessoDeFreteExisteGuard, UsuarioSolicitanteDoProcessoGuard, ProcessoDeFreteNaoAvaliadoGuard)
  @Post("freteiro/:id/:idFreteiro/:idProcessoDeFrete")
  createAvaliacaoFreteiro(
    @Param('id') idUsuarioAvaliador: string,
    @Param('idFreteiro') idFreteiro: string,
    @Param('idProcessoDeFrete') idProcessoDeFrete: string,
    @Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.criarAvaliacaoFreteiro(idUsuarioAvaliador,idFreteiro,createAvaliacaoDto, idProcessoDeFrete);
  }

  
  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao)
  @Put('freteiro/:idAvaliacao')
  updateAvaliacaoFreteiro(
    @Param('idAvaliacao') idAvaliacao: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto
  ) {
    return this.avaliacaoService.editarAvaliacaoFreteiro(idAvaliacao, updateAvaliacaoDto);
  }


  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao, ProcessoDeFreteExisteGuard)
  @Delete('freteiro/:idAvaliacao/:idProcessoDeFrete')
  removeAvaliacaoFreteiro(@Param('idAvaliacao') idAvaliacao: Avaliacao, @Param('idProcessoDeFrete') idProcessoDeFrete: string) {
    return this.avaliacaoService.deletarAvaliacaoFreteiro(idAvaliacao, idProcessoDeFrete);
  }


}

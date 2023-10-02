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

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, AvaliarMaquinaGuard)
  @Post("maquina/:id/:idMaquina")
  createAvaliacaoMaquina(
    @Param('id') idUsuarioAvaliador: string,
    @Param('idMaquina') idMaquina: string,
    @Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.criarAvaliacaoMaquina(idUsuarioAvaliador,idMaquina,createAvaliacaoDto);
  }

  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao)
  @Put('maquina/:idAvaliacao')
  updateAvaliacaoMaquina(
    @Param('idAvaliacao') idAvaliacao: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto
  ) {
    return this.avaliacaoService.editarAvaliacaoMaquina(idAvaliacao, updateAvaliacaoDto);
  }

  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao)
  @Delete('maquina/:idAvaliacao')
  removeAvaliacaoMaquina(@Param('idAvaliacao') idAvaliacao: Avaliacao) {
    return this.avaliacaoService.deletarAvaliacaoMaquina(idAvaliacao);
  }


  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, AvaliarFreteiroGuard)
  @Post("freteiro/:id/:idFreteiro")
  createAvaliacaoFreteiro(
    @Param('id') idUsuarioAvaliador: string,
    @Param('idFreteiro') idFreteiro: string,
    @Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.criarAvaliacaoFreteiro(idUsuarioAvaliador,idFreteiro,createAvaliacaoDto);
  }

  
  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao)
  @Put('freteiro/:idAvaliacao')
  updateAvaliacaoFreteiro(
    @Param('idAvaliacao') idAvaliacao: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto
  ) {
    return this.avaliacaoService.editarAvaliacaoFreteiro(idAvaliacao, updateAvaliacaoDto);
  }


  @UseGuards(JwtAuthGuard, AvaliacaoExisteGuard, UsuarioDonoAvaliacao)
  @Delete('freteiro/:idAvaliacao')
  removeAvaliacaoFreteiro(@Param('idAvaliacao') idAvaliacao: Avaliacao) {
    return this.avaliacaoService.deletarAvaliacaoFreteiro(idAvaliacao);
  }


}

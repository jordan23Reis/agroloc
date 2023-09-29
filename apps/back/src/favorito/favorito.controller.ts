import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { UsuarioComumGuard } from '../users/guards/UsuarioComum';
import { UsuarioCorretoGuard } from '../users/guards/UsuarioCorretoGuard';
import { UsuarioExisteGuard } from '../users/guards/UsuarioExiste';
import { FavoritarFreteiroGuard } from './guards/FavoritarFreteiroGuard';
import { DesfavoritarFreteiroGuard } from './guards/DesfavoritarFreteiroGuard';
import { FavoritarMaquinaGuard } from './guards/FavoritarMaquinaGuard';
import { DesfavoritarMaquinaGuard } from './guards/DesfavoritarMaquinaGuard';


@Controller('favorito')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) {}

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, FavoritarFreteiroGuard)
  @Post("freteiro/:id/:idFreteiro")
  createFavoritoFreteiro(@Param('id') idUsuarioFavoritador: string, @Param('idFreteiro') idFreteiro: string) {
    return this.favoritoService.adicionarFreteiroFavorito(idUsuarioFavoritador, idFreteiro);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, DesfavoritarFreteiroGuard)
  @Delete("freteiro/:id/:idFavorito")
  deleteFavoritoFreteiro( @Param('id') idUsuarioDesfavoritador: string, @Param('idFavorito') idFavorito: string) {
    return this.favoritoService.removerFreteiroFavorito(idUsuarioDesfavoritador, idFavorito);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, FavoritarMaquinaGuard)
  @Post("maquina/:id/:idMaquina")
  createFavoritoMaquina(@Param('id') idUsuarioFavoritador: string, @Param('idMaquina') idMaquina: string) {
    return this.favoritoService.adicionarMaquinaFavorita(idUsuarioFavoritador, idMaquina);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, UsuarioCorretoGuard, UsuarioExisteGuard, DesfavoritarMaquinaGuard)
  @Delete("maquina/:id/:idFavorito")
  deleteFavoritoMaquina( @Param('id') idUsuarioDesfavoritador: string, @Param('idFavorito') idFavorito: string) {
    return this.favoritoService.removerMaquinaFavorita(idUsuarioDesfavoritador, idFavorito);
  }
  
}

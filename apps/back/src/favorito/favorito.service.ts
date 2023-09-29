import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Favorito } from './entities/favorito.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';

@Injectable()
export class FavoritoService {
  constructor(
    @InjectModel(Favorito.name) private favoritoModel: Model<Favorito>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    @Inject(forwardRef(() => MaquinaService))
    private maquinaService: MaquinaService
  ){
  }


  async adicionarFreteiroFavorito(idUsuarioFavoritador:string, idFreteiro: string){
    const usuarioFreteiroFavoritado = await this.userService.findOne(idFreteiro);

    const Favorito = {
      ItemFavorito:{
        idItemFavorito: usuarioFreteiroFavoritado.id,
        Nome: usuarioFreteiroFavoritado.CadastroComum.Nome + " " + usuarioFreteiroFavoritado.CadastroComum.Sobrenome,
        Tipo: "Freteiro",
        ImagemPrincipal: undefined
      }
    }

    if(usuarioFreteiroFavoritado.CadastroComum.Foto){
      Favorito.ItemFavorito.ImagemPrincipal = {
        Url: usuarioFreteiroFavoritado.CadastroComum.Foto.Url,
        NomeArquivo: usuarioFreteiroFavoritado.CadastroComum.Foto.NomeArquivo
      }
    }

    const favoritoCriado = await this.favoritoModel.create(Favorito);

    const usuarioFavoritador = await this.userService.findOne(idUsuarioFavoritador);
    usuarioFavoritador.FreteirosFavoritos.push(favoritoCriado);
    await usuarioFavoritador.save();
    return favoritoCriado;
  }


  async removerFreteiroFavorito(idUsuarioDesfavoritador:string, idFavorito:string){
    const usuarioDesfavoritador = await this.userService.findOne(idUsuarioDesfavoritador);

    usuarioDesfavoritador.FreteirosFavoritos = usuarioDesfavoritador.FreteirosFavoritos.filter( (fav) => fav.toString() != idFavorito);
    await usuarioDesfavoritador.save();

    const favoritoRemovido = await this.favoritoModel.findByIdAndRemove(idFavorito);
    return favoritoRemovido;
  }

  async adicionarMaquinaFavorita(idUsuarioFavoritador:string, idMaquina: string){

    const maquinaFavoritada = await this.maquinaService.findOne(idMaquina);

    const Favorito = {
      ItemFavorito:{
        idItemFavorito: maquinaFavoritada.id,
        Nome: maquinaFavoritada.Nome,
        Tipo: "Maquina",
        ImagemPrincipal: undefined
      }
    }

    if(maquinaFavoritada.ImagemPrincipal){
      Favorito.ItemFavorito.ImagemPrincipal = {
        Url: maquinaFavoritada.ImagemPrincipal.Url,
        NomeArquivo: maquinaFavoritada.ImagemPrincipal.NomeArquivo
      }
    }

    const favoritoCriado = await this.favoritoModel.create(Favorito);
    const usuarioFavoritador = await this.userService.findOne(idUsuarioFavoritador);
    usuarioFavoritador.MaquinasFavoritas.push(favoritoCriado);
    await usuarioFavoritador.save();
    return favoritoCriado;
  }

  async removerMaquinaFavorita(idUsuarioDesfavoritador:string, idFavorito){
    const usuarioDesfavoritador = await this.userService.findOne(idUsuarioDesfavoritador);

    usuarioDesfavoritador.MaquinasFavoritas = usuarioDesfavoritador.MaquinasFavoritas.filter( (fav) => fav.toString() != idFavorito);
    await usuarioDesfavoritador.save();

    const favoritoRemovido = await this.favoritoModel.findByIdAndRemove(idFavorito);
    return favoritoRemovido;
  }

  async findFavoritosPorIdItemFavorito(idItemFavorito:string){
    const usuarioAchado = await this.favoritoModel.find({"ItemFavorito.idItemFavorito": idItemFavorito});
    return usuarioAchado;
  }



}

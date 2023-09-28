import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class FavoritarFreteiroGuard implements CanActivate {
    constructor(private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.params.id);
    await user.populate('FreteirosFavoritos');
    
    const userFreteiro = await this.userService.findOne(request.params.idFreteiro);
    if(!userFreteiro){
        throw new BadRequestException("Usuario a ser favoritado não existe!");
    }

    const FreiteiroNaLista = user.FreteirosFavoritos.find( (fav) => fav.ItemFavorito.idItemFavorito == request.params.idFreteiro);
    if(FreiteiroNaLista){
        throw new BadRequestException("Freteiro já esta favoritado!");
    }

    const freteiroCredenciais = await this.userService.findLoginTipo(request.params.idFreteiro);
    if(freteiroCredenciais.Login.Tipo != "Freteiro"){
        throw new BadRequestException("Usuario a ser favoritado não é um freteiro!");
    }

    return true;
  }



}
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class FavoritarMaquinaGuard implements CanActivate {
    constructor(private maquinaService: MaquinaService,private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.params.id);
    await user.populate('MaquinasFavoritas');
    
    const maquina = await this.maquinaService.findOne(request.params.idMaquina);
    if(!maquina){
        throw new BadRequestException("Maquina a ser favoritada não existe!");
    }

    const MaquinaNaLista = user.MaquinasFavoritas.find( (fav) => fav.ItemFavorito.idItemFavorito == request.params.idMaquina);
    if(MaquinaNaLista){
        throw new BadRequestException("Maquina já está favoritada!");
    }

    return true;
  }



}
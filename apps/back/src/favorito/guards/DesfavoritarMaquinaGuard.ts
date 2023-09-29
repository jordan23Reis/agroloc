import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class DesfavoritarMaquinaGuard implements CanActivate {
    constructor(private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.params.id);
    
    const MaquinaNaLista = user.MaquinasFavoritas.find( (fav) => fav == request.params.idFavorito);

    if(!MaquinaNaLista){
        throw new BadRequestException("Maquina não esta favoritada!");
    }

    return true;
  }



}
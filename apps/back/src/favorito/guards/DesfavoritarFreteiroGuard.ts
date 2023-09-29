import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class DesfavoritarFreteiroGuard implements CanActivate {
    constructor(private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.params.id);
    
    const FreiteiroNaLista = user.FreteirosFavoritos.find( (fav) => fav == request.params.idFavorito);

    if(!FreiteiroNaLista){
        throw new BadRequestException("Freteiro não esta favoritado!");
    }

    return true;
  }



}
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';
import { UsersService } from '../../users/users.service';


@Injectable()
export class UsuarioLogadoComumGuard implements CanActivate {
    constructor(private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const userService = await this.userService.findLoginTipo(request.user.IdUsuario);


    if(userService.Login.Tipo != "Comum"){
      throw new UnauthorizedException(`Você não é o usuario comum!`);
    }

    return true;
  }
}
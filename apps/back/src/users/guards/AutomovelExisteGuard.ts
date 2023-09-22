import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class AutomovelExisteGuard implements CanActivate {
    constructor(private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const usuario = await this.userService.findOne(request.params.id);
    const automovel = usuario.CadastroFreteiro.Automovel.find((aut) => aut._id.toString() == request.params.idAutomovel);

    if (!automovel) {
        throw new UnauthorizedException(`Automovel não existe!`);
    }

    return true;
  }
}
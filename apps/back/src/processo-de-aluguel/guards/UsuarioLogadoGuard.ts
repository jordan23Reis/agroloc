import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class UsuarioLogadoGuard implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();

    if(request.params.idUsuario !== request.user.IdUsuario){
      throw new UnauthorizedException(`Você não é o usuario logado!`);
    }

    return true;
  }
}
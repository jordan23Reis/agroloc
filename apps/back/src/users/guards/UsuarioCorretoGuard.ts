import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioCorretoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.IdUsuario !== request.params.id) {
        throw new UnauthorizedException(`Você não tem permissão para acessar esse recurso com essa conta!`);
      }

    return true;
  }
}
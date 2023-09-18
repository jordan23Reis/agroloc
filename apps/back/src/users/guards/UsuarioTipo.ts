import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioTipo implements CanActivate {
    constructor(private TipoUsuario: string){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.TipoUsuario !== this.TipoUsuario) {
        throw new UnauthorizedException(`Usuário não é ${this.TipoUsuario}`);
      }

    return true;
  }
}
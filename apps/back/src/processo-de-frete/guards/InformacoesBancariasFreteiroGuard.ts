import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class InformacoesBancariasFreteiroGuard implements CanActivate {
    constructor(private usuarioService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const infoBancarias = await this.usuarioService.findInformacoesBancarias(request.params.idFreteiro);
    
    if(!infoBancarias){
        throw new UnauthorizedException(`Freteiro não possui informações bancárias registradas!`);
    }

    return true;
  }
}
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class InformacoesBancariasLocadorGuard implements CanActivate {
    constructor(private usuarioService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const infoBancarias = await this.usuarioService.findInformacoesBancarias(request.params.idLocador);
    if(!infoBancarias){
        throw new BadRequestException(`Locador não possui informações bancárias registradas!`);
    }

    return true;
  }
}
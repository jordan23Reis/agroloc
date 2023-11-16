import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';
import { ProcessoDeFreteService } from '../processo-de-frete.service';


@Injectable()
export class ProcessoAComecarGuard implements CanActivate {
    constructor(
        private processoService: ProcessoDeFreteService
    ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeFrete = await this.processoService.findOne(request.params.idProcessoDeFrete);
    
    if(processoDeFrete?.Status !== "A Comecar"){
        throw new UnauthorizedException(`Este processo não esta a comecar!`);
    }

    return true;
  }
}
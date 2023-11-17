import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeFreteService } from '../processo-de-frete.service';


@Injectable()
export class ProcessoEmAndamentoGuard implements CanActivate {
    constructor(
        private processoService: ProcessoDeFreteService
    ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeFrete = await this.processoService.findOne(request.params.idProcessoDeFrete);
    
    if(processoDeFrete?.Status !== "Em Andamento"){
        throw new UnauthorizedException(`Este processo não esta em andamento!`);
    }

    return true;
  }
}
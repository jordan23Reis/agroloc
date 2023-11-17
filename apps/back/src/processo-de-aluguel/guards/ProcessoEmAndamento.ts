import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class ProcessoEmAndamento implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);
    
    if(processoDeAluguel?.Status !== "Em Andamento"){
        throw new UnauthorizedException(`Este processo não esta em andamento!`);
    }

    return true;
  }
}
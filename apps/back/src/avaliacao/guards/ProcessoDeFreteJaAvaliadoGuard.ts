import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeFreteService } from '../../processo-de-frete/processo-de-frete.service';


@Injectable()
export class ProcessoDeFreteJaAvaliadoGuard implements CanActivate {
    constructor(private processoService: ProcessoDeFreteService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeFrete = await this.processoService.findOne(request.params.idProcessoDeFrete);
    
    if(processoDeFrete.Status != "Avaliado"){
        throw new UnauthorizedException(`Este processo não esta avaliado!`);
    }

    return true;
  }
}
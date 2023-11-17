import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../../processo-de-aluguel/processo-de-aluguel.service';


@Injectable()
export class ProcessoDeAluguelExisteGuard implements CanActivate {
    constructor(
        private processoAluguelService: ProcessoDeAluguelService
    ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoAluguelService.findOne(request.params.idProcessoDeAluguel);
    
    if(!processoDeAluguel){
        throw new UnauthorizedException(`Este processo de aluguel não existe!`);
    }

    return true;
  }
}
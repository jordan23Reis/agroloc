import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class ProcessoAConfirmarPreco implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);
    
    if(processoDeAluguel?.Status !== "A Confirmar Preco"){
        throw new UnauthorizedException(`Este processo não esta a confirmar preco!`);
    }

    return true;
  }
}
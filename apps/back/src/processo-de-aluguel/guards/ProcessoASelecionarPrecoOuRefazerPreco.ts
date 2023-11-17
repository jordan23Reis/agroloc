import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class ProcessoASelecionarPrecoOuRefazerPreco implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);
    
    if(processoDeAluguel?.Status !== "A Selecionar Preco" && processoDeAluguel?.Status !== "A Refazer Preco"){
        throw new UnauthorizedException(`Este processo não esta a selecionar preco ou Refazer Preco!!`);
    }

    return true;
  }
}
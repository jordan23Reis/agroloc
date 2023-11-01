import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class ProcessoEmAndamentoOuARefazerPreco implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);
    
    if(processoDeAluguel?.Status !== "Em Andamento" && processoDeAluguel?.Status !== "A Refazer Preco"){
        throw new UnauthorizedException(`Este processo não esta em andamento ou a refazer o preco!`);
    }

    return true;
  }
}
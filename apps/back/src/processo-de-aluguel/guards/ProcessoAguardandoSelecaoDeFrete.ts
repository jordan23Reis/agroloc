import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class ProcessoAguardandoSelecaoDeFrete implements CanActivate {
    constructor(private usersService: UsersService, private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);
    
    if(processoDeAluguel?.Status !== "Aguardando Selecao de Frete"){
        throw new UnauthorizedException(`Este processo não esta aguardando frete!`);
    }

    return true;
  }
}
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class ProcessoAAceitarJaExisteGuard implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processo = await this.processoService.findExistingProcessoDeAluguelAAceitar(request.params.idMaquina, request.params.idLocador, request.params.idLocatario);

    if(processo){
      throw new BadRequestException(`Processo de aluguel a aceitar já existe`);
    }
    
    return true;
  }
}
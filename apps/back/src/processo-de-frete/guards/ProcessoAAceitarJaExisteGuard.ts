import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { ProcessoDeFreteService } from '../processo-de-frete.service';


@Injectable()
export class ProcessoAAceitarJaExisteGuard implements CanActivate {
    constructor(private processoService: ProcessoDeFreteService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processo = await this.processoService.findExistingProcessoDeAluguelAAceitar(request.params.idFreteiro, request.params.idSolicitante);

    if(processo){
      throw new BadRequestException(`Processo de frete a aceitar já existe`);
    }
    
    return true;
  }
}
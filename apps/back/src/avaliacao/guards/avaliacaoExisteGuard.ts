import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AvaliacaoService } from '../avaliacao.service';

@Injectable()
export class AvaliacaoExisteGuard implements CanActivate {
    constructor(private avaliacaoService: AvaliacaoService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    const avaliacao = await this.avaliacaoService.findOne(request.params.idAvaliacao);
    if(!avaliacao){
        throw new BadRequestException("Avaliação não existe!");
    }


    return true;
  }



}
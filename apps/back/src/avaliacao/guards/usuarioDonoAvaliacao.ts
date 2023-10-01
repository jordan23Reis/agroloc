import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AvaliacaoService } from '../avaliacao.service';

@Injectable()
export class UsuarioDonoAvaliacao implements CanActivate {
    constructor(private avaliacaoService: AvaliacaoService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    const avaliacao = await this.avaliacaoService.findOne(request.params.idAvaliacao);
    if(avaliacao.UsuarioAvaliador.idUsuarioAvaliador != request.user.IdUsuario){
        throw new BadRequestException("Avaliação não percente a usuário logado!");
    }


    return true;
  }



}
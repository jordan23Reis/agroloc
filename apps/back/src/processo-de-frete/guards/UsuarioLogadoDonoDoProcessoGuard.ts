import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeFreteService } from '../processo-de-frete.service';


@Injectable()
export class UsuarioLogadoDonoDoProcessoGuard implements CanActivate {
    constructor(private processoService: ProcessoDeFreteService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeFrete);

    if(processoDeAluguel?.Envolvidos?.Freteiro?.idFreteiro.toString() !== request.user.IdUsuario){
      throw new UnauthorizedException(`Você não é o freteiro deste processo de aluguel!`);
    }

    return true;
  }
}
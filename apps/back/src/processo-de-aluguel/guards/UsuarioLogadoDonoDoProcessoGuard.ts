import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class UsuarioLogadoDonoDoProcessoGuard implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);

    if(processoDeAluguel?.Envolvidos?.Locador?.idLocador.toString() !== request.user.IdUsuario){
      throw new UnauthorizedException(`Você não é o locador deste processo de aluguel!`);
    }

    return true;
  }
}
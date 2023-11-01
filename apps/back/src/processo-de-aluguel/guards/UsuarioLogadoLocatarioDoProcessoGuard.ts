import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class UsuarioLogadoLocatarioDoProcessoGuard implements CanActivate {
    constructor(private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);

    if(processoDeAluguel?.Envolvidos?.Locatario?.idLocatario.toString() !== request.user.IdUsuario){
      throw new UnauthorizedException(`Você não é o locatário deste processo de aluguel!`);
    }

    return true;
  }
}
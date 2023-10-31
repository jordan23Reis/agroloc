import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';
import { ProcessoDeAluguelService } from '../processo-de-aluguel.service';


@Injectable()
export class UsuarioLogadoDonoDoProcessoGuard implements CanActivate {
    constructor(private usersService: UsersService, private processoService: ProcessoDeAluguelService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const usuario = await this.usersService.findOne(request.user.IdUsuario);
    const processoDeAluguel = await this.processoService.findOne(request.params.idProcessoDeAluguel);

    if(processoDeAluguel?.Envolvidos?.Locador?.idLocador.toString() !== usuario.id){
      throw new UnauthorizedException(`Você não é o locador deste processo de aluguel para aceita-lo!`);
    }

    return true;
  }
}
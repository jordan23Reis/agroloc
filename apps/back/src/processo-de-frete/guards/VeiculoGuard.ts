import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class VeiculoGuard implements CanActivate {
    constructor(private usuarioService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const usuarioFreteiro = await this.usuarioService.findOne(request.user.IdUsuario);

    const veiculoAchado = usuarioFreteiro.CadastroFreteiro?.Automovel.find((el) => el == request.params.idVeiculo);
    
    if(!veiculoAchado){
        throw new BadRequestException(`Veículo não existe!`);
    }

    return true;
  }
}
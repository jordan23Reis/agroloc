import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { TipoPrecoService } from '../../tipo-preco/tipo-preco.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocadorLocatarioGuard implements CanActivate {
    constructor(private maquinaService: MaquinaService, private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const maquina = await this.maquinaService.findOne(request.params.idMaquina);
    const locadorTipo = await this.userService.findLoginTipo(request.params.idLocador);
    const locatarioTipo = await this.userService.findLoginTipo(request.params.idLocatario);

    if(maquina?.DonoDaMaquina.idDono.toString() !== request.params.idLocador){
      throw new BadRequestException(`Locador não é dono da máquina!`);
    }

    if(request.params.idLocador === request.params.idLocatario){
      throw new BadRequestException(`Locador não pode ser o mesmo que o locatário!`);
    }

    if(request.params.idLocatario != request.user.IdUsuario){
      throw new BadRequestException(`Locatário não é o usuário logado!`);
    }

    if(request.params.idLocatario === maquina.DonoDaMaquina.idDono.toString()){
      throw new BadRequestException(`Locatário não pode ser o dono da máquina!`);
    }

    if(locadorTipo.Login.Tipo !== "Comum" && locatarioTipo.Login.Tipo !== "Comum"){
      throw new BadRequestException(`Locador e Locatário devem ser usuários comuns!`);
    }

    return true;
  }
}
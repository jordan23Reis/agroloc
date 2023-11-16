import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { TipoPrecoService } from '../../tipo-preco/tipo-preco.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class TipoPrecoGuard implements CanActivate {
    constructor(private userService: UsersService, private tipoService: TipoPrecoService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    // const maquina = await this.userService.findOne(request.params.idMaquina);

    // if(!maquina?.Preco?.Tipo){
    //     throw new BadRequestException(`Maquina não tem um tipo de preço!`);
    // }

    // if (!await this.tipoService.findOne(maquina?.Preco?.Tipo?.idTipo)) {
    //     throw new BadRequestException(`Tipo preço da maquina não existe`);
    // }

    return true;
  }
}
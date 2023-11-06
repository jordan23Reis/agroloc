import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { TipoPrecoService } from '../../tipo-preco/tipo-preco.service';

@Injectable()
export class TipoPrecoGuard implements CanActivate {
    constructor(private maquinaService: MaquinaService, private tipoService: TipoPrecoService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const maquina = await this.maquinaService.findOne(request.params.idMaquina);
    if(!maquina?.Preco?.Tipo){
        throw new BadRequestException(`Maquina não tem um tipo de preço!`);
    }

    if (!await this.tipoService.findOne(maquina?.Preco?.Tipo?.idTipo)) {
        throw new BadRequestException(`Tipo preço da maquina não existe`);
    }

    return true;
  }
}
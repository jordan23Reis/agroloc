import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';

@Injectable()
export class MaquinaGuard implements CanActivate {
    constructor(private maquinaService: MaquinaService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const maquina = await this.maquinaService.findOne(request.params.idMaquina);

    if(!maquina){
      throw new BadRequestException(`Máquina não existe!`);
    }

    return true;
  }
}
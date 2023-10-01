import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AvaliarMaquinaGuard implements CanActivate {
    constructor(private maquinaService: MaquinaService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    const maquina = await this.maquinaService.findOne(request.params.idMaquina);
    if(!maquina){
        throw new BadRequestException("Maquina da avaliação não existe!");
    }

    //IMPLEMENTAR AQUI NO FUTURO A VERIFICAÇÃO SE O USUARIO JA AVALIOU A MAQUINA ANTES
    // DEPOIS QUE PROCESSO DE ALUGUEL E FRETE ESTIVER FEITO

    return true;
  }



}
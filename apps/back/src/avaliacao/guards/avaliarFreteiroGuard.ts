import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AvaliarFreteiroGuard implements CanActivate {
    constructor(private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    const freteiro = await this.userService.findOne(request.params.idFreteiro); 
    if(!freteiro){
        throw new BadRequestException("Freteiro da avaliação não existe!");
    }

    const tipoUsuario = await this.userService.findLoginTipo(request.params.idFreteiro); 
    if(tipoUsuario.Login.Tipo != "Freteiro"){
        throw new BadRequestException("Id informado não é de um freteiro!");
    }
 

    //IMPLEMENTAR AQUI NO FUTURO A VERIFICAÇÃO SE O USUARIO JA AVALIOU A MAQUINA ANTES
    // DEPOIS QUE PROCESSO DE ALUGUEL E FRETE ESTIVER FEITO

    return true;
  }



}
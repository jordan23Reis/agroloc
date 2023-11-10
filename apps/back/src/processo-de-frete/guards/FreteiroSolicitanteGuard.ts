import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { MaquinaService } from '../../maquina/maquina.service';
import { TipoPrecoService } from '../../tipo-preco/tipo-preco.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class FreteiroSolicitanteGuard implements CanActivate {
    constructor(private maquinaService: MaquinaService, private userService: UsersService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const usuarioFreteiro = await this.userService.findOne(request.params.idFreteiro);
    const usuarioSolicitante = await this.userService.findOne(request.params.idSolicitante);
    const freteiroTipo = await this.userService.findLoginTipo(request.params.idFreteiro);
    const solicitanteTipo = await this.userService.findLoginTipo(request.params.idSolicitante);
    // const veiculoAchado = usuarioFreteiro.CadastroFreteiro?.Automovel.find((el) => el == request.params.idVeiculo);

    // if(veiculoAchado?._id.toString() !== request.params.idFreteiro.toString()){
    //     throw new BadRequestException(`Freteiro não é dono do veiculo!`);
    // }

    if(request?.params?.idFreteiro === request?.params?.idSolicitante){
        throw new BadRequestException(`Freteiro não pode ser o mesmo usuário que o recebedor!`);
    }

    if(request?.params?.idSolicitante != request?.user?.IdUsuario){
        throw new BadRequestException(`Solicitante não é o usuário logado!`);
    }

    if(freteiroTipo?.Login?.Tipo !== "Freteiro" || solicitanteTipo?.Login?.Tipo !== "Comum"){
        throw new BadRequestException(`Freteiro deve ser Usuário Freteiro e Solicitante deve ser Usuário Solicitante`);
    }

    if(!usuarioFreteiro?.CadastroFreteiro?.EnderecoAtivo){
      throw new BadRequestException(`Freteiro deve ter um endereço ativo!`);
    }

    const enderecoSolicitante = usuarioSolicitante.CadastroComum.Enderecos.find(end => end._id.toString() == request?.params?.enderecoSolicitanteSelecionado);
    if(!enderecoSolicitante){
      throw new BadRequestException(`Endereço selecionado do solicitante não existe!`);
    }

    return true;
  }
}
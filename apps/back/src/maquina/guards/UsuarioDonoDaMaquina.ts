import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { MaquinaService } from '../maquina.service';

@Injectable()
export class UsuarioDonoDaMaquina implements CanActivate {
  constructor(
    private userService: UsersService,
    private maquinaService: MaquinaService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.user.IdUsuario);
    const maquina = await this.maquinaService.findOne(request.params.id);

    if (user.id !== maquina.DonoDaMaquina?.idDono?.toString()) {
      throw new UnauthorizedException(`Usuário não é Dono da Máquina!`);
    }

    return true;
  }
}

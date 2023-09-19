import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MaquinaService } from '../maquina.service';

@Injectable()
export class MaquinaExiste implements CanActivate {
    constructor(private maquinaService: MaquinaService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const maquina = await this.maquinaService.findOne(request.params.id);
    if (!maquina) {
        throw new UnauthorizedException(`Maquina não existe!`);
      }

    return true;
  }
}
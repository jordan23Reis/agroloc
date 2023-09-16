import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MaquinaService } from '../maquina.service';

@Injectable()
export class CheckMachineExistance implements NestMiddleware {
  constructor(private readonly maquinaService: MaquinaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const maquina = await this.maquinaService.findOne(
      req.params.idMaquina || req.params.id
    );

    if (maquina == null) {
      throw new BadRequestException('Algo de ruim ocorreu', {
        cause: new Error(),
        description: 'Essa maquina não existe',
      });
    }
    next();
  }
}

import { Module } from '@nestjs/common';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';
import { ProcessoDeAluguelController } from './processo-de-aluguel.controller';

@Module({
  controllers: [ProcessoDeAluguelController],
  providers: [ProcessoDeAluguelService],
})
export class ProcessoDeAluguelModule {}

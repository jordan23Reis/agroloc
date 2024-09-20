import { Module, forwardRef } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Avaliacao } from './entities/avaliacao.entity';
import { AvaliacaoMiddlewares } from './entities/avaliacao.middleware';
import { UsersModule } from '../users/users.module';
import { MaquinaModule } from '../maquina/maquina.module';
import { ProcessoDeAluguelModule } from '../processo-de-aluguel/processo-de-aluguel.module';
import { ProcessoDeFreteModule } from '../processo-de-frete/processo-de-frete.module';

const modelAvaliacao = MongooseModule.forFeatureAsync([
  {
    name: Avaliacao.name,
    useFactory: AvaliacaoMiddlewares,
  },
]);

@Module({
  imports: [
    modelAvaliacao, 
    forwardRef(() => UsersModule), 
    forwardRef(() => MaquinaModule),
    forwardRef(() => ProcessoDeAluguelModule),
    forwardRef(() => ProcessoDeFreteModule),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
  exports: [AvaliacaoService]
})
export class AvaliacaoModule {}

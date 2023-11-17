import { Module } from '@nestjs/common';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';
import { ProcessoDeAluguelController } from './processo-de-aluguel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessoDeAluguel } from './entities/processo-de-aluguel.entity';
import { ProcessoDeAluguelMiddlewares } from './entities/processo-de-aluguel.middlewares';
import { MaquinaModule } from '../maquina/maquina.module';
import { UsersModule } from '../users/users.module';
import { TipoPrecoModule } from '../tipo-preco/tipo-preco.module';
import { AsaasModule } from '../asaas/asaas.module';


const modelProcessoDeAluguel = MongooseModule.forFeatureAsync([
  {
    name: ProcessoDeAluguel.name,
    useFactory: ProcessoDeAluguelMiddlewares,
  },
]);

@Module({
  imports: [modelProcessoDeAluguel, MaquinaModule, UsersModule, TipoPrecoModule, AsaasModule],
  controllers: [ProcessoDeAluguelController],
  providers: [ProcessoDeAluguelService],
  exports: [ProcessoDeAluguelService]
})
export class ProcessoDeAluguelModule {}

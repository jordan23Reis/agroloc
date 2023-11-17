import { Module } from '@nestjs/common';
import { ProcessoDeFreteService } from './processo-de-frete.service';
import { ProcessoDeFreteController } from './processo-de-frete.controller';
import { ProcessoDeFreteMiddlewares } from './entities/processo-de-frete.middlewares';
import { ProcessoDeFrete } from './entities/processo-de-frete.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AsaasModule } from '../asaas/asaas.module';
import { TipoPrecoModule } from '../tipo-preco/tipo-preco.module';
import { UsersModule } from '../users/users.module';
import { MaquinaModule } from '../maquina/maquina.module';
import { ProcessoDeAluguelModule } from '../processo-de-aluguel/processo-de-aluguel.module';

const modelProcessoDeFrete = MongooseModule.forFeatureAsync([
  {
    name: ProcessoDeFrete.name,
    useFactory: ProcessoDeFreteMiddlewares,
  },
]);

@Module({
  imports: [modelProcessoDeFrete, ProcessoDeAluguelModule, MaquinaModule, UsersModule, TipoPrecoModule, AsaasModule],
  controllers: [ProcessoDeFreteController],
  providers: [ProcessoDeFreteService],
})
export class ProcessoDeFreteModule {}

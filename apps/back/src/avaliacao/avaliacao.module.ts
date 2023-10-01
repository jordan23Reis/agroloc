import { Module, forwardRef } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Avaliacao } from './entities/avaliacao.entity';
import { AvaliacaoMiddlewares } from './entities/avaliacao.middleware';
import { UsersModule } from '../users/users.module';
import { MaquinaModule } from '../maquina/maquina.module';

const modelAvaliacao = MongooseModule.forFeatureAsync([
  {
    name: Avaliacao.name,
    useFactory: AvaliacaoMiddlewares,
  },
]);

@Module({
  imports: [modelAvaliacao, forwardRef(() => UsersModule), forwardRef(() => MaquinaModule)],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
  exports: [AvaliacaoService]
})
export class AvaliacaoModule {}

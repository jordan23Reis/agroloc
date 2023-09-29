import { Module, forwardRef } from '@nestjs/common';
import { TipoPrecoService } from './tipo-preco.service';
import { TipoPrecoController } from './tipo-preco.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoPreco } from './entities/tipo-preco.entity';
import { TipoPrecoMiddlewares } from './entities/tipo-preco.middlewares';
import { MaquinaModule } from '../maquina/maquina.module';

const modelTipoPreco = MongooseModule.forFeatureAsync([
  {
    name: TipoPreco.name,
    useFactory: TipoPrecoMiddlewares,
  },
]);

@Module({
  imports: [modelTipoPreco, forwardRef(() => MaquinaModule)],
  controllers: [TipoPrecoController],
  providers: [TipoPrecoService],
  exports: [TipoPrecoService]
})
export class TipoPrecoModule {}

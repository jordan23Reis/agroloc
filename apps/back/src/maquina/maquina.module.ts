import { Module } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { MaquinaController } from './maquina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina, MaquinaSchema } from './entities/maquina.entity';
import { MaquinaMiddlewares } from './entities/maquina.middlewares';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: Maquina.name, 
        useFactory: MaquinaMiddlewares
        // schema: MaquinaSchema 
      }
    ])
  ],
  controllers: [MaquinaController],
  providers: [MaquinaService],
})
export class MaquinaModule {}

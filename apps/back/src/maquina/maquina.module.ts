import { Module } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { MaquinaController } from './maquina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina, MaquinaSchema } from './entities/maquina.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: Maquina.name, 
        useFactory: () => {
          const schema = MaquinaSchema;
          schema.pre('findOneAndRemove', function () {
            //IMPLEMENTAR AQUI A REMOÇÃO DE TUDO ATRELADO A MAQUINA QUE DEVE SER REMOVIDO
          });
          return schema;
        }
        // schema: MaquinaSchema 
      }
    ])
  ],
  controllers: [MaquinaController],
  providers: [MaquinaService],
})
export class MaquinaModule {}

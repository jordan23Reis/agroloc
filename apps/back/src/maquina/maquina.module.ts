import { Module } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { MaquinaController } from './maquina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina, MaquinaSchema } from './entities/maquina.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Maquina.name, schema: MaquinaSchema }])],
  controllers: [MaquinaController],
  providers: [MaquinaService],
})
export class MaquinaModule {}

import {  Module, forwardRef } from '@nestjs/common';
import { MaquinaController } from './maquina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina } from './entities/maquina.entity';
import { MaquinaMiddlewares } from './entities/maquina.middlewares';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagemModule } from '../imagem/imagem.module';
import { MaquinaService } from './maquina.service';
import { UsersModule } from '../users/users.module';

const modelMaquina = MongooseModule.forFeatureAsync([
  {
    name: Maquina.name,
    useFactory: MaquinaMiddlewares,
  },
]);

@Module({
  imports: [modelMaquina, CloudinaryModule, ImagemModule, forwardRef(() => UsersModule)],
  controllers: [MaquinaController],
  providers: [MaquinaService],
  exports: [MaquinaService],
})
export class MaquinaModule {
}

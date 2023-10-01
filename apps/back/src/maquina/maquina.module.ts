import {  Module, forwardRef } from '@nestjs/common';
import { MaquinaController } from './maquina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina } from './entities/maquina.entity';
import { MaquinaMiddlewares } from './entities/maquina.middlewares';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagemModule } from '../imagem/imagem.module';
import { MaquinaService } from './maquina.service';
import { UsersModule } from '../users/users.module';
import { FavoritoModule } from '../favorito/favorito.module';
import { TipoPrecoModule } from '../tipo-preco/tipo-preco.module';
import { CategoriaModule } from '../categoria/categoria.module';

const modelMaquina = MongooseModule.forFeatureAsync([
  {
    name: Maquina.name,
    useFactory: MaquinaMiddlewares,
  },
]);

@Module({
  imports: [
    modelMaquina, 
    CloudinaryModule, 
    ImagemModule, 
    forwardRef(() => UsersModule), 
    forwardRef(() => FavoritoModule),
    forwardRef(() => TipoPrecoModule),
    forwardRef(() => CategoriaModule)
  ],
  controllers: [MaquinaController],
  providers: [MaquinaService],
  exports: [MaquinaService],
})
export class MaquinaModule {
}

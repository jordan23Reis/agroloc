import { Module, forwardRef } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { FavoritoController } from './favorito.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorito } from './entities/favorito.entity';
import { FavoritoMiddlewares } from './entities/favorito.middlewares';
import { UsersModule } from '../users/users.module';
import { MaquinaModule } from '../maquina/maquina.module';


const modelFavorito = MongooseModule.forFeatureAsync([
  {
    name: Favorito.name,
    useFactory: FavoritoMiddlewares,
  },
]);

@Module({
  imports: [modelFavorito, forwardRef(() => UsersModule), forwardRef(() => MaquinaModule) ],
  controllers: [FavoritoController],
  providers: [FavoritoService],
  exports: [FavoritoService]
})
export class FavoritoModule {}

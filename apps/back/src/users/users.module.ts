import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario } from './entities/user.entity';
import { UserMiddlewares } from './entities/user.middleware';
import { ConfigModule } from '@nestjs/config';
import { MaquinaModule } from '../maquina/maquina.module';
import { ImagemModule } from '../imagem/imagem.module';
import { FavoritoModule } from '../favorito/favorito.module';
import { TipoPrecoModule } from '../tipo-preco/tipo-preco.module';

const modelUsuario = MongooseModule.forFeatureAsync([
  {
    name: Usuario.name,
    useFactory: UserMiddlewares,
  },
]);

@Module({
  imports: [modelUsuario, ConfigModule, forwardRef(() => MaquinaModule),forwardRef(() => FavoritoModule), forwardRef(() => TipoPrecoModule), ImagemModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

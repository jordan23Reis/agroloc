import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario } from './entities/user.entity';
import { UserMiddlewares } from './entities/user.middleware';
import { ConfigModule } from '@nestjs/config';

const modelUsuario = MongooseModule.forFeatureAsync([
  {
    name: Usuario.name,
    useFactory: UserMiddlewares,
  },
]);

@Module({
  imports: [modelUsuario, ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

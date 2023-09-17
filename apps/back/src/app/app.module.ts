import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaquinaModule } from '../maquina/maquina.module';
import { UsersModule } from '../users/users.module';
import { AuthUserModule } from '../auth-user/auth-user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/agroloc'),
    MaquinaModule,
    UsersModule,
    AuthUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

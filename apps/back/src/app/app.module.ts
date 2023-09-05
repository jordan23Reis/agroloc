import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/agroloc'), UsersModule],
=======
import { MaquinaModule } from '../maquina/maquina.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/agroloc'), MaquinaModule],
>>>>>>> origin/main
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

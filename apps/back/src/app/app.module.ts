import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaquinaModule } from '../maquina/maquina.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './configs/config';
import { UsersModule } from '../users/users.module';
import { AuthUserModule } from '../auth-user/auth-user.module';
import { FavoritoModule } from '../favorito/favorito.module';
import { CategoriaModule } from '../categoria/categoria.module';
import { AvaliacaoModule } from '../avaliacao/avaliacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: 'development.env',
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configSecret: ConfigService) => ({
        uri: configSecret.get('mongoUri'),
      }),
    }),
    AuthUserModule,
    MaquinaModule,
    UsersModule,
    FavoritoModule,
    CategoriaModule,
    AvaliacaoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

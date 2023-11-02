import { Module } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { AsaasController } from './asaas.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('asaasUrlBase') + configService.get('asaasVersao'),
        headers: {          
          Accept: 'application/json',
          'Content-Type': 'application/json',
          access_token: configService.get('asaasToken')
        },
        timeout: 7000,
        maxRedirects: 5
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AsaasController],
  providers: [AsaasService],
  exports:[AsaasService]
})
export class AsaasModule {}

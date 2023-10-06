import { Module } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { AsaasController } from './asaas.controller';

@Module({
  controllers: [AsaasController],
  providers: [AsaasService],
})
export class AsaasModule {}

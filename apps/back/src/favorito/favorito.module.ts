import { Module } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { FavoritoController } from './favorito.controller';

@Module({
  controllers: [FavoritoController],
  providers: [FavoritoService],
})
export class FavoritoModule {}

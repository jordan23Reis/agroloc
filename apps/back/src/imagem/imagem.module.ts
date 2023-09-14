import { Module } from '@nestjs/common';
import { ImagemService } from './imagem.service';

@Module({
  providers: [ImagemService],
  exports: [ImagemService]
})
export class ImagemModule {}

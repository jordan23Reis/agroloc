import { Module } from '@nestjs/common';
import { ImagemService } from './imagem.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [ImagemService],
  exports: [ImagemService],
})
export class ImagemModule {}

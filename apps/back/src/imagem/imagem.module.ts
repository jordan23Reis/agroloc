import { DynamicModule, Module } from '@nestjs/common';
import { ImagemService } from './imagem.service';

@Module({
  providers: [ImagemService],
  exports: [ImagemService]
})
export class ImagemModule {
  
  static forRoot(Schema): DynamicModule {
    return {
      module: ImagemModule,
      providers: [
        {
          provide: 'Schema',
          useValue: Schema,
        },
      ],
      exports: [ImagemService],
    }
  }
}

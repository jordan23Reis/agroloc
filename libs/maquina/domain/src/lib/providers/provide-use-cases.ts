import { ImagemService } from '@agroloc/shared/util';
import { CreateImagemPrincipalUseCase } from '../usecases/criar-imagem-principal.usecase';
import { MaquinaService } from '../ports';

export function provideUseCases() {
  return [
    {
      provide: CreateImagemPrincipalUseCase,
      inject: [MaquinaService, ImagemService],
    },
  ];
}

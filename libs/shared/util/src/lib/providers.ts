import { ImagemServiceImpl } from './infrastructure';
import { ImagemService } from './ports';

export function provideImagemService() {
  return {
    provide: ImagemService,
    useClass: ImagemServiceImpl,
  };
}

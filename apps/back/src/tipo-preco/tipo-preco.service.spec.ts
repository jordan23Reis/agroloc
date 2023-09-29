import { Test, TestingModule } from '@nestjs/testing';
import { TipoPrecoService } from './tipo-preco.service';

describe('TipoPrecoService', () => {
  let service: TipoPrecoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoPrecoService],
    }).compile();

    service = module.get<TipoPrecoService>(TipoPrecoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

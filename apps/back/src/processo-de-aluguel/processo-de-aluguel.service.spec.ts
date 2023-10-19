import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';

describe('ProcessoDeAluguelService', () => {
  let service: ProcessoDeAluguelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessoDeAluguelService],
    }).compile();

    service = module.get<ProcessoDeAluguelService>(ProcessoDeAluguelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

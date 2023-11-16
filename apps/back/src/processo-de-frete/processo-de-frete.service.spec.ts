import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoDeFreteService } from './processo-de-frete.service';

describe('ProcessoDeFreteService', () => {
  let service: ProcessoDeFreteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessoDeFreteService],
    }).compile();

    service = module.get<ProcessoDeFreteService>(ProcessoDeFreteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

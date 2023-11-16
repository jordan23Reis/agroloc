import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoDeFreteController } from './processo-de-frete.controller';
import { ProcessoDeFreteService } from './processo-de-frete.service';

describe('ProcessoDeFreteController', () => {
  let controller: ProcessoDeFreteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoDeFreteController],
      providers: [ProcessoDeFreteService],
    }).compile();

    controller = module.get<ProcessoDeFreteController>(
      ProcessoDeFreteController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

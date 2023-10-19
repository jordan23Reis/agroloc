import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoDeAluguelController } from './processo-de-aluguel.controller';
import { ProcessoDeAluguelService } from './processo-de-aluguel.service';

describe('ProcessoDeAluguelController', () => {
  let controller: ProcessoDeAluguelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoDeAluguelController],
      providers: [ProcessoDeAluguelService],
    }).compile();

    controller = module.get<ProcessoDeAluguelController>(
      ProcessoDeAluguelController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TipoPrecoController } from './tipo-preco.controller';
import { TipoPrecoService } from './tipo-preco.service';

describe('TipoPrecoController', () => {
  let controller: TipoPrecoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPrecoController],
      providers: [TipoPrecoService],
    }).compile();

    controller = module.get<TipoPrecoController>(TipoPrecoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

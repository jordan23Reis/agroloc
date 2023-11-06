import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessoDeAluguelDto } from './create-processo-de-aluguel.dto';

export class UpdateProcessoDeAluguelDto extends PartialType(
  CreateProcessoDeAluguelDto
) {}

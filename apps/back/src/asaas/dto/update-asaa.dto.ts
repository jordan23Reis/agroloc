import { PartialType } from '@nestjs/mapped-types';
import { CreateAsaaDto } from './create-asaa.dto';

export class UpdateAsaaDto extends PartialType(CreateAsaaDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritoDto } from './full-favorito.dto';

export class UpdateFavoritoDto extends PartialType(CreateFavoritoDto) {}

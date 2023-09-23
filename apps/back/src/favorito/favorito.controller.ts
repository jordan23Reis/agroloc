import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { CreateFavoritoDto } from './dto/full-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';

@Controller('favorito')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) {}

  @Post()
  create(@Body() createFavoritoDto: CreateFavoritoDto) {
    return this.favoritoService.create(createFavoritoDto);
  }

  @Get()
  findAll() {
    return this.favoritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoritoDto: UpdateFavoritoDto
  ) {
    return this.favoritoService.update(+id, updateFavoritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritoService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { FullCategoriaDto  } from './dto/full-categoria.dto';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { UsuarioAdministradorGuard } from '../users/guards/UsuarioAdministrador';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @UseGuards(JwtAuthGuard, UsuarioAdministradorGuard)
  @Post()
  create(@Body() createCategoriaDto: FullCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @UseGuards(JwtAuthGuard, UsuarioAdministradorGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto
  ) {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @UseGuards(JwtAuthGuard, UsuarioAdministradorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(id);
  }
}

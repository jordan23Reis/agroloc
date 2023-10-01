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
import { TipoPrecoService } from './tipo-preco.service';
import { FullTipoPrecoDto } from './dto/full.tipo-preco.dto';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { UsuarioAdministradorGuard } from '../users/guards/UsuarioAdministrador';

@Controller('tipo-preco')
export class TipoPrecoController {
  constructor(private readonly tipoPrecoService: TipoPrecoService) {}


  @Get()
  findAll() {
    return this.tipoPrecoService.findAll();
  }



  @UseGuards(JwtAuthGuard, UsuarioAdministradorGuard)
  @Post()
  create(@Body() createTipoPrecoDto: FullTipoPrecoDto) {
    return this.tipoPrecoService.create(createTipoPrecoDto);
  }

  @UseGuards(JwtAuthGuard, UsuarioAdministradorGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoPrecoDto: FullTipoPrecoDto
  ) {
    return this.tipoPrecoService.update(id, updateTipoPrecoDto);
  }

  @UseGuards(JwtAuthGuard, UsuarioAdministradorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPrecoService.remove(id);
  }
}

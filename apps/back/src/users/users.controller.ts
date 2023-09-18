import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { UsuarioCorretoGuard } from './guards/UsuarioCorretoGuard';
import { UsuarioExisteGuard } from './guards/UsuarioExiste';
import { CadastroDto } from './dto/cadastro-user.dto';
import { InformacoesBancarias } from './dto/full-user.dto';
import { UsuarioFreteiroGuard } from './guards/UsuarioFreteiro';
import { Automovel } from './dto/automovel.dto';

@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const createdUser = this.usersService.create(createUserDto);
      return createdUser;
    } catch (e) {
      return e;
    }
  }

  @UseGuards(UsuarioExisteGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (e) {
      return e;
    }
  }

  @Get("freteiros")
  findAll(@Query() query) {
    try {
      return this.usersService.findFreteiros(query);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Get("cadastro/:id")
  findCadastroUsuario(@Param("id") id: string) {
    try {
      return this.usersService.findCadastro(id);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Put("cadastro/:id")
  updateCadastroUsuario(@Param("id") id: string, @Body() cadastro: CadastroDto) {
    try {
      return this.usersService.updateCadastro(id, cadastro);
    } catch (e) {
      return e;
    }
  }
  
  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Get("informacoesbancarias/:id")
  findInformacaoBancariaUsuario(@Param("id") id: string) {
    try {
      return this.usersService.findInformacoesBancarias(id);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Put("informacoesbancarias/:id/:idAutomovel")
  updateInformacaoBancariaUsuario(@Param("id") id: string, @Body() informacoesBancarias: InformacoesBancarias) {
    try {
      return this.usersService.updateInformacoesBancarias(id, informacoesBancarias);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard, UsuarioFreteiroGuard)
  @Post("automovel/:id")
  adicionarAutomovelUsuario(@Param("id") id: string, @Body() automovel: Automovel) {
    try {
      return this.usersService.adicionarAutomovel(id, automovel);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard, UsuarioFreteiroGuard)
  @Put("automovel/:id/:idUsuario")
  editarAutomovelUsuario(@Param("id") id: string, @Param("idUsuario") idUsuario: string, @Body() automovel: Automovel) {
    try {
      return this.usersService.editarAutomovel(id, idUsuario,automovel);
    } catch (e) {
      return e;
    }
  }





}

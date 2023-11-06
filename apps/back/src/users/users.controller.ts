import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Put,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { UsuarioCorretoGuard } from './guards/UsuarioCorretoGuard';
import { UsuarioExisteGuard } from './guards/UsuarioExiste';
import { CadastroDto } from './dto/cadastro-user.dto';
import { Enderecos, InformacoesBancarias } from './dto/full-user.dto';
import { UsuarioFreteiroGuard } from './guards/UsuarioFreteiro';
import { Automovel } from './dto/automovel.dto';
import { Senha } from './dto/senha.dto';
import {
  UsuarioImagemConfigs,
  UsuarioImagemLimites,
  VeiculoImagemConfigs,
  VeiculoImagemLimites,
} from '@agroloc/shared/util';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { AutomovelExisteGuard } from './guards/AutomovelExisteGuard';
import mongoose from 'mongoose';

@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = this.usersService.create(createUserDto);
      return createdUser;
    } catch (e) {
      return e;
    }
  }

  @Get('freteiros')
  findAll(@Query() query) {
    try {
      return this.usersService.findFreteiros(query);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(UsuarioExisteGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOneSafe(id);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Get('cadastro/:id')
  findCadastroUsuario(@Param('id') id: string) {
    try {
      return this.usersService.findCadastro(id);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Put('cadastro/:id')
  updateCadastroUsuario(
    @Param('id') id: string,
    @Body() cadastro: CadastroDto
  ) {
    try {
      return this.usersService.updateCadastro(id, cadastro);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard
  )
  @Put('enderecofreteiro/:id/:idEndereco')
  updateEnderecoFreteiro(
    @Param('id') id: string,
    @Param('idEndereco') idEndereco: mongoose.Schema.Types.ObjectId
  ) {
    try {
      return this.usersService.atualizarEnderecoFreteiro(id, idEndereco);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard
  )
  @Delete('enderecofreteiro/:id')
  deleteEnderecoFreteiro(@Param('id') id: string) {
    try {
      return this.usersService.deleteEnderecoFreteiro(id);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Put('senha/:id')
  updateSenhaUsuario(@Param('id') id: string, @Body() senha: Senha) {
    try {
      return this.usersService.updateSenha(id, senha);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Get('informacoesbancarias/:id')
  findInformacaoBancariaUsuario(@Param('id') id: string) {
    try {
      return this.usersService.findInformacoesBancarias(id);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Put('informacoesbancarias/:id')
  updateInformacaoBancariaUsuario(
    @Param('id') id: string,
    @Body() informacoesBancarias: InformacoesBancarias
  ) {
    try {
      return this.usersService.updateInformacoesBancarias(
        id,
        informacoesBancarias
      );
    } catch (e) {
      return e;
    }
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard
  )
  @Post('automovel/:id')
  adicionarAutomovelUsuario(
    @Param('id') id: string,
    @Body() automovel: Automovel
  ) {
    try {
      return this.usersService.adicionarAutomovel(id, automovel);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard
  )
  @Put('automovel/:id/:idAutomovel')
  editarAutomovelUsuario(
    @Param('id') id: string,
    @Param('idAutomovel') idAutomovel: string,
    @Body() automovel: Automovel
  ) {
    try {
      return this.usersService.editarAutomovel(id, idAutomovel, automovel);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard
  )
  @Delete('automovel/:id/:idAutomovel')
  removerAutomovelUsuario(
    @Param('id') id: string,
    @Param('idAutomovel') idAutomovel: string
  ) {
    try {
      return this.usersService.removerAutomovel(id, idAutomovel);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Post('endereco/:id')
  adicionarEnderecoUsuario(
    @Param('id') id: string,
    @Body() automovel: Enderecos
  ) {
    try {
      return this.usersService.adicionarEndereco(id, automovel);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Put('endereco/:id/:idEndereco')
  editarEnderecoUsuario(
    @Param('id') id: string,
    @Param('idEndereco') idEndereco: string,
    @Body() endereco: Enderecos
  ) {
    try {
      return this.usersService.editarEndereco(id, idEndereco, endereco);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Delete('endereco/:id/:idEndereco')
  removerEnderecoUsuario(
    @Param('id') id: string,
    @Param('idEndereco') idEndereco: string
  ) {
    try {
      return this.usersService.removerEndereco(id, idEndereco);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Post('foto/:id')
  @UseInterceptors(
    FileInterceptor('Imagem', {
      dest: join(__dirname, UsuarioImagemConfigs.caminhoImagemPrincipalLocal),
    })
  )
  createFoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: UsuarioImagemLimites.tamMaxImagem,
          }),
          new FileTypeValidator({
            fileType: new RegExp(
              '(' + UsuarioImagemLimites.tiposPermitidos + ')$'
            ),
          }),
        ],
      })
    )
    imagem: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.usersService.createFotoPerfil(imagem, id);
  }

  @UseGuards(JwtAuthGuard, UsuarioExisteGuard, UsuarioCorretoGuard)
  @Delete('foto/:id')
  deleteFoto(@Param('id') id: string) {
    return this.usersService.removerFotoPerfil(id);
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard,
    AutomovelExisteGuard
  )
  @Post('automovel/imagem/principal/:id/:idAutomovel')
  @UseInterceptors(
    FileInterceptor('Imagem', {
      dest: join(__dirname, VeiculoImagemConfigs.caminhoImagemPrincipalLocal),
    })
  )
  createImagemPrincipalVeiculo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: VeiculoImagemLimites.tamMaxImagem,
          }),
          new FileTypeValidator({
            fileType: new RegExp(
              '(' + VeiculoImagemLimites.tiposPermitidos + ')$'
            ),
          }),
        ],
      })
    )
    imagem: Express.Multer.File,
    @Param('id') id: string,
    @Param('idAutomovel') idAutomovel: string
  ) {
    return this.usersService.createImagemPrincipalAutomovel(
      imagem,
      id,
      idAutomovel
    );
  }

  @UseGuards(
    JwtAuthGuard,
    UsuarioExisteGuard,
    UsuarioCorretoGuard,
    UsuarioFreteiroGuard,
    AutomovelExisteGuard
  )
  @Delete('automovel/imagem/principal/:id/:idAutomovel')
  deleteImagemPrincipalVeiculo(
    @Param('id') id: string,
    @Param('idAutomovel') idAutomovel: string
  ) {
    return this.usersService.deleteImagemPrincipalAutomovel(id, idAutomovel);
  }

  @UseGuards(JwtAuthGuard)
  @Post('automovel/imagem/secundaria/:id/:idAutomovel')
  @UseInterceptors(
    FilesInterceptor('Imagens', VeiculoImagemLimites.maxImagemsACriar, {
      dest: join(
        __dirname,
        VeiculoImagemConfigs.caminhoImagensSecundariasLocal
      ),
    })
  )
  createImagensSecundariasVeiculo(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: VeiculoImagemLimites.tamMaxImagem,
          }),
          new FileTypeValidator({
            fileType: new RegExp(
              '(' + VeiculoImagemLimites.tiposPermitidos + ')$'
            ),
          }),
        ],
      })
    )
    imagens: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Param('idAutomovel') idAutomovel: string
  ) {
    return this.usersService.createImagemsSecundarias(imagens, id, idAutomovel);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('automovel/imagem/secundaria/:id/:idAutomovel/:filename')
  deleteImagemSecundaria(
    @Param('id') id: string,
    @Param('idAutomovel') idAutomovel: string,
    @Param('filename') filename: string
  ) {
    return this.usersService.deleteImagemSecundaria(id, idAutomovel, filename);
  }
}

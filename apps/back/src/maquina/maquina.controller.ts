import {
  Controller,
  Get,
  Post,
  Body,
  Request,  
  Put,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  FileTypeValidator,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseGuards,
} from '@nestjs/common';
import { CreateUpdateMaquinaDto } from './dto/create-update-maquina.dto';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
  MaquinaImagemConfigs,
  MaquinaImagemLimites,
} from '@agroloc/shared/util';
import 'multer';
import "express";
import { join } from 'path';
import { MaquinaService } from './maquina.service';
import { JwtAuthGuard } from '../auth-user/guards/jwt.auth-user.guard';
import { MaquinaExiste } from './guards/MaquinaExiste';
import { UsuarioComumGuard } from '../users/guards/UsuarioComum';
import { UsuarioDonoDaMaquina } from './guards/UsuarioDonoDaMaquina';
import mongoose from 'mongoose';

@Controller('maquina')
export class MaquinaController {
  constructor(private readonly maquinaService: MaquinaService) {}

  @UseGuards(JwtAuthGuard, UsuarioComumGuard)
  @Post()
  create(@Body() createMaquinaDto: CreateUpdateMaquinaDto, @Request() req) {
    return this.maquinaService.create(createMaquinaDto, req);
  }

  @Get()
  find(@Query() query) {
    return this.maquinaService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maquinaService.findOneSafe(id);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, MaquinaExiste, UsuarioDonoDaMaquina)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMaquinaDto: CreateUpdateMaquinaDto) {
    return this.maquinaService.update(id, updateMaquinaDto);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, MaquinaExiste, UsuarioDonoDaMaquina)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.maquinaService.remove(id, req);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, MaquinaExiste, UsuarioDonoDaMaquina)
  @Post('imagem/principal/:id')
  @UseInterceptors(
    FileInterceptor('Imagem', {
      dest: join(__dirname, MaquinaImagemConfigs.caminhoImagemPrincipalLocal),
    })
  )
  createImagemPrincipal(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: MaquinaImagemLimites.tamMaxImagem,
          }),
          new FileTypeValidator({
            fileType: new RegExp(
              '(' + MaquinaImagemLimites.tiposPermitidos + ')$'
            ),
          }),
        ],
      })
    )
    imagem: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.maquinaService.createImagemPrincipal(imagem, id);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, MaquinaExiste, UsuarioDonoDaMaquina)
  @Delete('imagem/principal/:id/')
  deleteImagemPrincipal(@Param('id') id: string) {
    return this.maquinaService.deleteImagemPrincipal(id);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, MaquinaExiste, UsuarioDonoDaMaquina)
  @Post('imagem/secundaria/:id')
  @UseInterceptors(
    FilesInterceptor('Imagens', MaquinaImagemLimites.maxImagemsACriar, {
      dest: join(
        __dirname,
        MaquinaImagemConfigs.caminhoImagensSecundariasLocal
      ),
    })
  )
  createImagemsSecundarias(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: MaquinaImagemLimites.tamMaxImagem,
          }),
          new FileTypeValidator({
            fileType: new RegExp(
              '(' + MaquinaImagemLimites.tiposPermitidos + ')$'
            ),
          }),
        ],
      })
    )
    imagens: Array<Express.Multer.File>,
    @Param('id') id: string
  ) {
    return this.maquinaService.createImagemsSecundarias(imagens, id);
  }

  @UseGuards(JwtAuthGuard, UsuarioComumGuard, MaquinaExiste, UsuarioDonoDaMaquina)
  @Delete('imagem/secundaria/:id/:filename')
  deleteImagemSecundaria(
    @Param('filename') filename: string,
    @Param('id') id: string
  ) {
    return this.maquinaService.deleteImagemSecundaria(filename, id);
  }
}

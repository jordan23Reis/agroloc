import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
} from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { MaquinaConfigs, MaquinaLimites } from '@agroloc/shared/util';
import 'multer';
import { join } from 'path';
import { ImagemService } from '../imagem/imagem.service';

@Controller('maquina')
export class MaquinaController {
  constructor(private readonly maquinaService: MaquinaService, private imagemService: ImagemService) {}

  @Post()
  create(@Body() createMaquinaDto: CreateMaquinaDto) {
    return this.maquinaService.create(createMaquinaDto);
  }

  @Get()
  find(@Query() query) {
    return this.maquinaService.find(query);
  }

  @Get("teste")
  finnnd() {
    return this.imagemService.findAll(this.maquinaService);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maquinaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMaquinaDto: UpdateMaquinaDto) {
    return this.maquinaService.update(id, updateMaquinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maquinaService.remove(id);
  }

  @Post('imagem/principal/:idMaquina')
  @UseInterceptors(FileInterceptor('Imagem', {dest: join(__dirname, MaquinaConfigs.caminhoImagemPrincipalLocal)}))
  createImagemPrincipal(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MaquinaLimites.tamMaxImagem }),
          new FileTypeValidator({
            fileType: new RegExp('(' + MaquinaLimites.tiposPermitidos + ')$'),
          }),
        ],
      })
    )
    imagem: Express.Multer.File,
    @Param('idMaquina') idMaquina: string
  ) {
    return this.maquinaService.createImagemPrincipal(imagem, idMaquina);
  }

  @Delete('imagem/principal/:idMaquina/')
  deleteImagemPrincipal(
    @Param('idMaquina') idMaquina: string
  ) {
    return this.maquinaService.deleteImagemPrincipal(idMaquina);
  }


  @Post('imagem/secundaria/:idMaquina')
  @UseInterceptors(FilesInterceptor('Imagens', MaquinaLimites.maxImagemsACriar, {dest: join(__dirname, MaquinaConfigs.caminhoImagensSecundariasLocal)}))
  createImagemsSecundarias(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MaquinaLimites.tamMaxImagem }),
          new FileTypeValidator({
            fileType: new RegExp('(' + MaquinaLimites.tiposPermitidos + ')$'),
          }),
        ],
      })
    )
    imagens: Array<Express.Multer.File>,
    @Param('idMaquina') idMaquina: string
  ) {
    return this.maquinaService.createImagemsSecundarias(imagens, idMaquina);
  }


  @Delete('imagem/secundaria/:idMaquina/:filename')
  deleteImagemSecundaria(
    @Param('filename') filename: string,
    @Param('idMaquina') idMaquina: string
  ) {
    return this.maquinaService.deleteImagemSecundaria(filename, idMaquina);
  }


}

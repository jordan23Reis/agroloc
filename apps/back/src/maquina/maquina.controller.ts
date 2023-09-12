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
import { MaquinaLimites } from '@agroloc/shared/util';
import 'multer';

@Controller('maquina')
export class MaquinaController {
  constructor(private readonly maquinaService: MaquinaService) {}

  @Post()
  create(@Body() createMaquinaDto: CreateMaquinaDto) {
    return this.maquinaService.create(createMaquinaDto);
  }

  @Get()
  find(@Query() query) {
    return this.maquinaService.find(query);
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

  @Post('imagemprincipal/:idmaquina')
  @UseInterceptors(FileInterceptor('Imagem'))
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
    Imagem: Express.Multer.File,
    @Param('idmaquina') idMaquina: string
  ) {
    return this.maquinaService.createImagemPrincipal(Imagem, idMaquina);
  }

  @Post('imagemsecundaria/:idmaquina')
  @UseInterceptors(FilesInterceptor('Imagens', MaquinaLimites.maxImagemsACriar))
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
    Imagens: Array<Express.Multer.File>,
    @Param('idmaquina') idMaquina: string
  ) {
    return this.maquinaService.createImagemsSecundarias(Imagens, idMaquina);
  }

  @Delete('imagemsecundaria/:foto/:idmaquina')
  deleteImagemsSecundarias(
    @Param('foto') foto: string,
    @Param('idmaquina') idMaquina: string
  ) {
    return this.maquinaService.deleteImagemsSecundarias(foto, idMaquina);
  }
}

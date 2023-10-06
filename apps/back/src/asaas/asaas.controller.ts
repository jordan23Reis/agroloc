import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { CreateAsaaDto } from './dto/create-asaa.dto';
import { UpdateAsaaDto } from './dto/update-asaa.dto';

@Controller('asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Post()
  createUsuario(@Body() createAsaaDto: CreateAsaaDto) {
    return this.asaasService.createCliente();
  }


}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,

} from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { Cliente } from './dto/create-cliente.dto';

@Controller('asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Post()
  createCliente(@Body() createCliente: Cliente) {
    try{
    return this.asaasService.createCliente(createCliente)
    }catch(e){
      return e;
    }
  }

  @Get(":id")
  findCliente(@Param('id') id: string) {
    try{
    return this.asaasService.recuperarCliente(id);
    }catch(e){
      return e;
    }
  }

  @Get()
  findClientes(){
    try{
    return this.asaasService.recuperarClientes();
    }catch(e){
      return e;
    }
  }

  @Put(":id")
  editCliente(@Body() createCliente: Cliente, @Param('id') id: string) {
    try{
    return this.asaasService.editarCliente(createCliente,id);
    }catch(e){
      return e;
    }
  }

  @Delete(":id")
  deleteCliente(@Param('id') id: string){
    try{
    return this.asaasService.deletarCliente(id);
    }catch(e){
      return e;
    }
  }

}

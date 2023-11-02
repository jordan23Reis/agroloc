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
import { CobrancaUnica } from './dto/create-cobranca-unica.dto';
import { CobrancaParcelada } from './dto/create-cobranca-parcelada.dto';
import { TransferenciaConta } from './dto/create-transferencia-conta.dto';
import { TransferenciaPix } from './dto/create-transferencia-pix.dto';

@Controller('asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Post("cliente")
  createCliente(@Body() createCliente: Cliente) {
    try{
    return this.asaasService.createCliente(createCliente)
    }catch(e){
      return e;
    }
  }

  @Get("cliente/:id")
  findCliente(@Param('id') id: string) {
    try{
    return this.asaasService.recuperarCliente(id);
    }catch(e){
      return e;
    }
  }

  @Get("cliente/cpfCnpj/:cpfCnpj")
  findClienteCpf(@Param('cpfCnpj') cpfCnpj: string) {
    try{
    return this.asaasService.recuperarClientePorCpfCnpj(cpfCnpj);
    }catch(e){
      return e;
    }
  }

  @Get("cliente")
  findClientes(){
    try{
    return this.asaasService.recuperarClientes();
    }catch(e){
      return e;
    }
  }

  @Put("cliente/:id")
  editCliente(@Body() createCliente: Cliente, @Param('id') id: string) {
    try{
    return this.asaasService.editarCliente(createCliente,id);
    }catch(e){
      return e;
    }
  }

  @Delete("cliente/:id")
  deleteCliente(@Param('id') id: string){
    try{
    return this.asaasService.deletarCliente(id);
    }catch(e){
      return e;
    }
  }

  @Post("cobranca/unica")
  createCobrancaUnica(@Body() createCobranca: CobrancaUnica) {
    try{
    return this.asaasService.criarCobrancaPagamentoUnico(createCobranca)
    }catch(e){
      return e;
    }
  }
  @Post("cobranca/parcelada")
  createCobrancaParcelada(@Body() createCobranca: CobrancaParcelada) {
    try{
    return this.asaasService.criarCobrancaPagamentoParcelado(createCobranca)
    }catch(e){
      return e;
    }
  }

  @Get("cobranca")
  findCobrancas(){
    try{
    return this.asaasService.recuperarCobrancas();
    }catch(e){
      return e;
    }
  }

  @Get("cobranca/:id")
  findCobranca(@Param('id') id: string) {
    try{
    return this.asaasService.recuperarCobranca(id);
    }catch(e){
      return e;
    }
  }

  @Delete("cobranca/:id")
  deleteCobranca(@Param('id') id: string){
    try{
    return this.asaasService.deletarCobranca(id);
    }catch(e){
      return e;
    }
  }

  @Post("transferencia/conta")
  createTransferenciaParaConta(@Body() transferenciaConta: TransferenciaConta) {
    try{
    return this.asaasService.criarTransferenciaConta(transferenciaConta)
    }catch(e){
      return e;
    }
  }

  
  @Post("transferencia/pix")
  createTransferenciaParaPix(@Body() transferenciaPix: TransferenciaPix) {
    try{
    return this.asaasService.criarTransferenciaPix(transferenciaPix)
    }catch(e){
      return e;
    }
  }


  

}

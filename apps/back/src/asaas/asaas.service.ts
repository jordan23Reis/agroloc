import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Cliente } from './dto/create-cliente.dto';
import { CobrancaUnica } from './dto/create-cobranca-unica.dto';
import { CobrancaSchemaDtoRestraints, addDays, aumentaPrecoParcela, formataData } from '@agroloc/shared/util';
import { CobrancaParcelada } from './dto/create-cobranca-parcelada.dto';
import { TransferenciaConta } from './dto/create-transferencia-conta.dto';
import { TransferenciaPix } from './dto/create-transferencia-pix.dto';

@Injectable()
export class AsaasService {


  constructor(private httpService: HttpService){
  }

  //=======CLIENTES=======//

  async createCliente(createCliente: Cliente){
    const { data } = await firstValueFrom(
      this.httpService.post('/customers', 
      createCliente
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }

  async recuperarCliente(id: string){
    const { data } = await firstValueFrom(
      this.httpService.get('/customers/'+id
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }

  async recuperarClientePorCpfCnpj(cpfCnpj: string){
    const { data } = await firstValueFrom(
      this.httpService.get('/customers?cpfCnpj='+cpfCnpj+"&limit=1"
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data.data[0];
  }

  async recuperarClientes(){
    const { data } = await firstValueFrom(
      this.httpService.get('/customers'
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data.data;
  }

  async editarCliente(createCliente: Cliente, id: string){
    const { data } = await firstValueFrom(
      this.httpService.put('/customers/'+id, createCliente
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }

  async deletarCliente(id: string){
    const { data } = await firstValueFrom(
      this.httpService.delete('/customers/'+id
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }
  //=======FIM CLIENTES=======//

  //=======COBRANCAS=======//
  async criarCobrancaPagamentoUnico(createCobranca: CobrancaUnica){
    const dueDate = 
    formataData(
      addDays(
        new Date(), 
        CobrancaSchemaDtoRestraints.diasExpiracaoPagamento
    ));
    const cobranca = {
      ...createCobranca,
      dueDate,
      billingType: "UNDEFINED"
    }
    console.log(cobranca);


    const { data } = await firstValueFrom(
      this.httpService.post('/payments', 
      cobranca
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    console.log(data);
    return data;
  }

  async criarCobrancaPagamentoParcelado(createCobranca: CobrancaParcelada){
    const dueDate = 
    formataData(
      addDays(
        new Date(), 
        CobrancaSchemaDtoRestraints.diasExpiracaoPagamento
    ));
    const cobranca = {
      ...createCobranca,
      dueDate,
      billingType: "UNDEFINED"
    }
    cobranca.installmentValue = aumentaPrecoParcela(cobranca.installmentValue);
    console.log(cobranca);


    const { data } = await firstValueFrom(
      this.httpService.post('/payments', 
      cobranca
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    console.log(data);
    return data;
  }

  async recuperarCobrancas(){
    const { data } = await firstValueFrom(
      this.httpService.get('/payments'
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data.data;
  }

  async recuperarCobranca(id: string){
    const { data } = await firstValueFrom(
      this.httpService.get('/payments/'+id
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }

  async recuperarCobrancaPorExternalId(id: string){
    const { data } = await firstValueFrom(
      this.httpService.get('/payments?externalReference='+id+"&limit=1"
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }

  async deletarCobranca(id: string){
    const { data } = await firstValueFrom(
      this.httpService.delete('/payments/'+id
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }


  async criarTransferenciaConta(createTransferenciaConta: TransferenciaConta){
    try{
    const { data } = await firstValueFrom(
      this.httpService.post('/transfers', 
      createTransferenciaConta
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    console.log(data);
    return data;
    }catch(e){
      return e;
    }
  }

  async criarTransferenciaPix(createTransferenciaPix: TransferenciaPix){
    try{

    const { data } = await firstValueFrom(
      this.httpService.post('/transfers', 
      createTransferenciaPix
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    console.log(data);
    return data;
    }catch(e){
      return e;
    }
  }

  

}

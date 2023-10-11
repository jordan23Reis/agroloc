import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Cliente } from './dto/create-cliente.dto';
import { CobrancaUnica } from './dto/create-cobranca-unica.dto';
import { CobrancaSchemaDtoRestraints, addDays, formataData } from '@agroloc/shared/util';

@Injectable()
export class AsaasService {


  constructor(private httpService: HttpService){
  }

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



  

}

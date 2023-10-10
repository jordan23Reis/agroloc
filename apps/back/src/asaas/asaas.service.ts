import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Cliente } from './dto/create-cliente.dto';
import { Cobranca } from './dto/create-cobranca.dto';

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

  async criarCobranca(createCobranca: Cobranca){
    const { data } = await firstValueFrom(
      this.httpService.post('/payments', 
      createCobranca
      ).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }



  

}

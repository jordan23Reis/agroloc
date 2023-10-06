import { Injectable } from '@nestjs/common';
import { CreateAsaaDto } from './dto/create-asaa.dto';
import { UpdateAsaaDto } from './dto/update-asaa.dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AsaasService {
  urlBase: string;
  axiosInstance: AxiosInstance;
  versao: string

  constructor(private configService: ConfigService){
    this.versao = this.configService.get('asaasVersao');
    this.urlBase = this.configService.get('asaasUrlBase');
    this.axiosInstance = axios.create({
      baseURL: this.urlBase + this.versao + "/",
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: this.configService.get('asaasToken')
      } 
    });
  }

  async createCliente(){
    console.log(this.urlBase + this.versao + "/")
    console.log(this.configService.get('asaasToken'))
    const createdCliente = await this.axiosInstance.post('customers', {
      "name": "Lucas",
      "cpfCnpj": "23423123212"
  },{});

  return createdCliente;
  }

}

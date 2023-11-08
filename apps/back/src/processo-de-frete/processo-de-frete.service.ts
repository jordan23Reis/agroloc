import { Injectable } from '@nestjs/common';
import { CreateProcessoDeFreteDto } from './dto/create-processo-de-frete.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProcessoDeFrete } from './entities/processo-de-frete.entity';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';
import { TipoPrecoService } from '../tipo-preco/tipo-preco.service';
import { AsaasService } from '../asaas/asaas.service';

@Injectable()
export class ProcessoDeFreteService {
  constructor(
  @InjectModel(ProcessoDeFrete.name) 
  private processoDeFreteModel: Model<ProcessoDeFrete>,
  private usersService: UsersService,
  private maquinaService: MaquinaService,
  private tipoPrecoService: TipoPrecoService,
  private asaasService: AsaasService
  ){}

  async findExistingProcessoDeAluguelAAceitar(idFreteiro: string, idSolicitante: string) {
    const processoDeAluguel = await this.processoDeFreteModel.findOne({
      Status: "A aceitar",
      "Envolvidos.Freteiro.idFreteiro": idFreteiro,
      "Envolvidos.Locatario.idSolicitante": idSolicitante
    });

    return processoDeAluguel;
  }

  async create(idMaquina: string, idLocador:string, idLocatario) {
    const maquina = await this.maquinaService.findOne(idMaquina);
    const locador = await this.usersService.findOne(idLocador);
    const locatario = await this.usersService.findOne(idLocatario);
    const tipoPreco = await this.tipoPrecoService.findOne(maquina.Preco.Tipo.idTipo);
    const informacoesBancariasLocador = await this.usersService.findInformacoesBancarias(idLocador);

    const ProcessoDeAluguel = {
      Status: "A aceitar",
      Maquina: {
        idMaquina: maquina.id,
        Nome: maquina.Nome,
        ImagemPrincipal: {
          Url: maquina?.ImagemPrincipal?.Url,
          NomeArquivo: maquina?.ImagemPrincipal?.NomeArquivo
        }
      },

      Pagamento: { 
        Status: "Pra Pagar",
        Preco: {  
          ValorPorTipo: maquina.Preco.ValorPorTipo,
          Tipo:{
            idTipo: tipoPreco.id,
            Nome: tipoPreco.Nome
          }
        },
        PixRecebedor: {
          Chave: informacoesBancariasLocador.Pix.Chave,
          Tipo: informacoesBancariasLocador.Pix.Tipo
        },
        ContaBancariaRecebedor:{
          Agencia: informacoesBancariasLocador.ContaBancaria.Agencia,
          Conta: informacoesBancariasLocador.ContaBancaria.Conta
        }

      },

      Envolvidos:{
        Locador: {
          idLocador: locador._id.toString(),
          Nome: locador.CadastroComum.Nome,
          Foto: {
            Url: locador?.CadastroComum?.Foto?.Url,
            NomeArquivo: locador?.CadastroComum?.Foto?.NomeArquivo
          }
        },
        Locatario: {
          idLocatario: locatario._id.toString(),
          Nome: locatario.CadastroComum.Nome,
          Foto: {
            Url: locatario?.CadastroComum?.Foto?.Url,
            NomeArquivo: locatario?.CadastroComum?.Foto?.NomeArquivo
          }
      }
    }
  }

  if(!locatario?.CadastroComum?.Foto){
    delete ProcessoDeAluguel.Envolvidos.Locatario.Foto;
  }

  if(!locador?.CadastroComum?.Foto){
    delete ProcessoDeAluguel.Envolvidos.Locador.Foto;
  }

  if(!maquina?.ImagemPrincipal){
    delete ProcessoDeAluguel.Maquina.ImagemPrincipal;
  }

  const createdProcessoDeAluguel = this.processoDeFreteModel.create(ProcessoDeAluguel);
  return createdProcessoDeAluguel;
  }


  findAll() {
    return `This action returns all processoDeFrete`;
  }

  async findOne(id: string) {
    const foundUser = await this.processoDeFreteModel.findById(id);
    return foundUser;
  }



  remove(id: number) {
    return `This action removes a #${id} processoDeFrete`;
  }
}

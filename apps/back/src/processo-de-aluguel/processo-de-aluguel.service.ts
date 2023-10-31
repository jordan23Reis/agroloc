import { Injectable } from '@nestjs/common';
import { CreateProcessoDeAluguelDto } from './dto/create-processo-de-aluguel.dto';
import { UpdateProcessoDeAluguelDto } from './dto/update-processo-de-aluguel.dto';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';
import { TipoPrecoService } from '../tipo-preco/tipo-preco.service';
import { ProcessoDeAluguel } from './entities/processo-de-aluguel.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PagamentoDto } from './dto/pagamento-dto';

@Injectable()
export class ProcessoDeAluguelService {
  constructor(
    @InjectModel(ProcessoDeAluguel.name) private processoDeAluguelModel: Model<ProcessoDeAluguel>,
    private usersService: UsersService,
    private maquinaService: MaquinaService,
    private tipoPrecoService: TipoPrecoService
  ) { }


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

  const createdProcessoDeAluguel = this.processoDeAluguelModel.create(ProcessoDeAluguel);
  return createdProcessoDeAluguel;
  }

  async findExistingProcessoDeAluguelAAceitar(idMaquina: string, idLocador: string, idLocatario: string) {
    const processoDeAluguel = await this.processoDeAluguelModel.findOne({
      Status: "A aceitar",
      "Maquina.idMaquina": idMaquina,
      "Envolvidos.Locador.idLocador": idLocador,
      "Envolvidos.Locatario.idLocatario": idLocatario
    });

    return processoDeAluguel;
  }

  async aceitarProcessoDeAluguel(idProcessoDeAluguel: string){
    const processoDeAluguel = await this.processoDeAluguelModel.findById(idProcessoDeAluguel);
    const maquinaAtreladaAprocesso = await this.maquinaService.findOne(processoDeAluguel.Maquina.idMaquina.toString());

    maquinaAtreladaAprocesso.EstaAtiva = true;
    processoDeAluguel.Status = "Aguardando Frete";

    await processoDeAluguel.save();
    await maquinaAtreladaAprocesso.save();
    return processoDeAluguel;
  }

  async pularFrete(idProcessoDeAluguel: string){
    const processoDeAluguel = await this.processoDeAluguelModel.findById(idProcessoDeAluguel);
    processoDeAluguel.Status = "A Comecar";

    await processoDeAluguel.save();
    return processoDeAluguel;
  }

  async comecarProcesso(idProcessoDeAluguel: string){
    const processoDeAluguel = await this.processoDeAluguelModel.findById(idProcessoDeAluguel);
    processoDeAluguel.Status = "Em Andamento";

    await processoDeAluguel.save();
    return processoDeAluguel;
  }
  
  async concluirProcessoDeAluguel(idProcessoDeAluguel: string, pagamentoDto: PagamentoDto){
    const processoDeAluguel = await this.processoDeAluguelModel.findById(idProcessoDeAluguel);
    processoDeAluguel.Status = "A Pagar";

    await processoDeAluguel.save();
    return processoDeAluguel;
  }
  
  findAll() {
    return `This action returns all processoDeAluguel`;
  }

  async findOne(id: string) {
    const foundUser = await this.processoDeAluguelModel.findById(id);
    return foundUser;
  }

  update(id: number, updateProcessoDeAluguelDto: UpdateProcessoDeAluguelDto) {
    return `This action updates a #${id} processoDeAluguel`;
  }

  remove(id: number) {
    return `This action removes a #${id} processoDeAluguel`;
  }
}

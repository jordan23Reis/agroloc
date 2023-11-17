import { Injectable } from '@nestjs/common';
import { CreateProcessoDeFreteDto } from './dto/create-processo-de-frete.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProcessoDeFrete } from './entities/processo-de-frete.entity';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';
import { TipoPrecoService } from '../tipo-preco/tipo-preco.service';
import { AsaasService } from '../asaas/asaas.service';
import { ProcessoDeAluguelService } from '../processo-de-aluguel/processo-de-aluguel.service';

@Injectable()
export class ProcessoDeFreteService {
  constructor(
  @InjectModel(ProcessoDeFrete.name) 
  private processoDeFreteModel: Model<ProcessoDeFrete>,
  private usersService: UsersService,
  private maquinaService: MaquinaService,
  private processoDeAluguelService: ProcessoDeAluguelService
  ){}

  async findExistingProcessoDeAluguelAAceitar(idFreteiro: string, idSolicitante: string) {
    const processoDeAluguel = await this.processoDeFreteModel.findOne({
      Status: "A aceitar",
      "Envolvidos.Freteiro.idFreteiro": idFreteiro,
      "Envolvidos.Solicitante.idSolicitante": idSolicitante
    });

    return processoDeAluguel;
  }

  async create(idProcessoDeAluguel:string, idMaquina: string, idFreteiro:string, idSolicitante, enderecoSolicitanteSelecionado: string, valorProposto: number) {
    const solicitante = await this.usersService.findOne(idSolicitante);
    const freteiro = await this.usersService.findOne(idFreteiro);
    const informacoesBancariasFreteiro = await this.usersService.findInformacoesBancarias(idFreteiro);
    const enderecoSolicitante = solicitante.CadastroComum.Enderecos.find(end => end._id.toString() == enderecoSolicitanteSelecionado);
    const maquinaSolicitante = await this.maquinaService.findOne(idMaquina);
    const processoDeAluguel = await this.processoDeAluguelService.findOne(idProcessoDeAluguel);

    if(processoDeAluguel.Status == "Aguardando Selecao de Frete de Ida"){
      processoDeAluguel.Status = "Aguardando Frete de Ida";
      await processoDeAluguel.save();
    }else if(processoDeAluguel.Status == "Aguardando Selecao de Frete de Volta"){
      processoDeAluguel.Status = "Aguardando Frete de Volta";
      await processoDeAluguel.save();
    }

    const ProcessoDeFrete = {
      Status: "A aceitar",
      CepOrigem: freteiro?.CadastroFreteiro?.EnderecoAtivo?.Cep,
      CepDestino: enderecoSolicitante?.Cep,
      idProcessoDeAluguel: processoDeAluguel,
      Pagamento: { 
        Status: "Pra Pagar",
        Valor: valorProposto,
        PixRecebedor: {
          Chave: informacoesBancariasFreteiro?.Pix?.Chave,
          Tipo: informacoesBancariasFreteiro?.Pix?.Tipo
        },
        ContaBancariaRecebedor:{
          Agencia: informacoesBancariasFreteiro?.ContaBancaria?.Agencia,
          Conta: informacoesBancariasFreteiro?.ContaBancaria?.Conta
        }

      },
      Maquina: {
        idMaquina: maquinaSolicitante?.id,
        Nome: maquinaSolicitante?.Nome,
        ImagemPrincipal: {
          Url: maquinaSolicitante?.Url,
          NomeArquivo: maquinaSolicitante?.NomeArquivo
        }
      },
      Envolvidos:{
        Freteiro: {
          idFreteiro: freteiro?._id.toString(),
          Nome: freteiro?.CadastroComum.Nome,
          Foto: {
            Url: freteiro?.CadastroComum?.Foto?.Url,
            NomeArquivo: freteiro?.CadastroComum?.Foto?.NomeArquivo
          }
        },
        Solicitante: {
          idSolicitante: solicitante?._id?.toString(),
          Nome: solicitante?.CadastroComum?.Nome,
          Foto: {
            Url: solicitante?.CadastroComum?.Foto?.Url,
            NomeArquivo: solicitante?.CadastroComum?.Foto?.NomeArquivo
          }
      }
    }
  }

  if(!solicitante?.CadastroComum?.Foto){
    delete ProcessoDeFrete.Envolvidos.Solicitante.Foto;
  }

  if(!freteiro?.CadastroComum?.Foto){
    delete ProcessoDeFrete.Envolvidos.Freteiro.Foto;
  }

  if(!maquinaSolicitante.ImagemPrincipal) {
    delete ProcessoDeFrete.Maquina.ImagemPrincipal;
  }


  const createdProcessoDeFrete = await this.processoDeFreteModel.create(ProcessoDeFrete);
  return createdProcessoDeFrete;
  }

  async aceitarProcessoDeFrete(idProcessoDeFrete: string, idVeiculo: string){
    const processoDeFrete = await this.processoDeFreteModel.findById(idProcessoDeFrete);
    const usuarioFreteiroAtreladoAoProcesso = await this.usersService.findOne(processoDeFrete.Envolvidos.Freteiro.idFreteiro.toString());


    usuarioFreteiroAtreladoAoProcesso.CadastroFreteiro.EstaAtivo = false;
    processoDeFrete.Status = "A Comecar";
    const veiculoAchado = usuarioFreteiroAtreladoAoProcesso.CadastroFreteiro?.Automovel.find((el) => el._id.toString() == idVeiculo);

    processoDeFrete.Veiculo.idVeiculo = veiculoAchado._id;
    processoDeFrete.Veiculo.Nome = veiculoAchado.Nome;
    processoDeFrete.Veiculo.ImagemPrincipal.NomeArquivo = veiculoAchado?.ImagemPrincipal?.NomeArquivo;
    processoDeFrete.Veiculo.ImagemPrincipal.Url = veiculoAchado?.ImagemPrincipal?.Url;

    if(!veiculoAchado?.ImagemPrincipal){
      delete processoDeFrete.Veiculo.ImagemPrincipal;
    }

    await processoDeFrete.save();
    await usuarioFreteiroAtreladoAoProcesso.save();
    return processoDeFrete;
  }


  async recusarProcessoDeFrete(idProcessoDeFrete: string){
    const processoDeFrete = await this.processoDeFreteModel.findById(idProcessoDeFrete);
    processoDeFrete.Status = "Recusado";
    await processoDeFrete.save();
    return processoDeFrete;
  }


  async comecarProcessoDeFrete(idProcessoDeFrete: string){
    const processoDeFrete = await this.processoDeFreteModel.findById(idProcessoDeFrete);
    processoDeFrete.Status = "Em Andamento";
    await processoDeFrete.save();
    return processoDeFrete;
  }

  async finalizarProcessoDeFrete(idProcessoDeFrete: string){
    const processoDeFrete = await this.processoDeFreteModel.findById(idProcessoDeFrete);
    processoDeFrete.Status = "A Pagar";
    await processoDeFrete.save();
    return processoDeFrete;
  }

  async confirmarPagamentoProcessoDeFrete(idProcessoDeFrete: string){
    const processoDeFrete = await this.processoDeFreteModel.findById(idProcessoDeFrete);
    processoDeFrete.Status = "A Avaliar";
    await processoDeFrete.save();
    const processoDeAluguel = await this.processoDeAluguelService.findOne(processoDeFrete.idProcessoDeAluguel.toString());
    
    if(processoDeAluguel.Status == "Aguardando Frete de Ida"){
      processoDeAluguel.Status = "A Comecar";
      await processoDeAluguel.save();
    }else if(processoDeAluguel.Status == "Aguardando Frete de Volta"){
      processoDeAluguel.Status = "A Selecionar Preco";
      await processoDeAluguel.save();
    }


    return processoDeFrete;
  }



  
  async findOne(id: string) {
    const foundUser = await this.processoDeFreteModel.findById(id);
    return foundUser;
  }

}

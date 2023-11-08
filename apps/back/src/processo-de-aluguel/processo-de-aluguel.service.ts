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
import { AsaasService } from '../asaas/asaas.service';
import { Cliente } from '../asaas/dto/create-cliente.dto';
import { CobrancaUnica } from '../asaas/dto/create-cobranca-unica.dto';
import { TransferenciaPix } from '../asaas/dto/create-transferencia-pix.dto';
import { TransferenciaConta } from '../asaas/dto/create-transferencia-conta.dto';

@Injectable()
export class ProcessoDeAluguelService {
  constructor(
    @InjectModel(ProcessoDeAluguel.name) private processoDeAluguelModel: Model<ProcessoDeAluguel>,
    private usersService: UsersService,
    private maquinaService: MaquinaService,
    private tipoPrecoService: TipoPrecoService,
    private asaasService: AsaasService
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
    processoDeAluguel.Status = "A Confirmar Preco";
    processoDeAluguel.Pagamento.TipoRecebimento = pagamentoDto.TipoRecebimento;
    processoDeAluguel.Pagamento.QuantificadorPreco = pagamentoDto.QuantificadorPreco;
    processoDeAluguel.Pagamento.Valor = pagamentoDto.QuantificadorPreco * processoDeAluguel.Pagamento.Preco.ValorPorTipo;

    await processoDeAluguel.save();
    return processoDeAluguel;
  }

  async confirmarPrecoProcessoDeAluguel(idProcessoDeAluguel){
    const processoDeAluguel = await this.processoDeAluguelModel.findById(idProcessoDeAluguel);
    const locatario = await this.usersService.findOne(processoDeAluguel.Envolvidos.Locatario.idLocatario.toString());
    let cliente;
    if(locatario.CadastroComum.Cpf){
      cliente = await this.asaasService.recuperarClientePorCpfCnpj(locatario.CadastroComum.Cpf)
      if(!cliente){
        const clienteDto: Cliente = {
          name: locatario.CadastroComum.Nome,
          cpfCnpj: locatario.CadastroComum.Cpf,
          externalReference: locatario._id.toString()
        }
        console.log(clienteDto);
        cliente = await this.asaasService.createCliente(clienteDto);
      }
    }
    else if (locatario.CadastroComum.Cnpj){
      cliente = await this.asaasService.recuperarClientePorCpfCnpj(locatario.CadastroComum.Cnpj)
      if(!cliente){
        const clienteDto: Cliente = {
          name: locatario.CadastroComum.Nome,
          cpfCnpj: locatario.CadastroComum.Cpf,
          externalReference: locatario._id.toString()
        }
        cliente = await this.asaasService.createCliente(clienteDto);
      }
    }

    const cobrancaDto: CobrancaUnica = {
      customer: cliente.id,
      value: processoDeAluguel.Pagamento.Valor,
      description: "Aluguel de "+processoDeAluguel.Maquina.Nome,
      externalReference: processoDeAluguel._id.toString()
    }
    
    const cobranca = await this.asaasService.criarCobrancaPagamentoUnico(cobrancaDto)
    processoDeAluguel.Pagamento.LinkPagamento = cobranca.invoiceUrl;
    processoDeAluguel.Pagamento.Status = "PENDING";
    processoDeAluguel.Status = "A Pagar";
    await processoDeAluguel.save();
    return processoDeAluguel;
  }

  async recusarPrecoProcessoDeAluguel(idProcessoDeAluguel){
    const processoDeAluguel = await this.processoDeAluguelModel.findById(idProcessoDeAluguel);
    processoDeAluguel.Status = "A Refazer Preco";
    processoDeAluguel.Pagamento.TipoRecebimento = undefined;
    processoDeAluguel.Pagamento.QuantificadorPreco = undefined;
    processoDeAluguel.Pagamento.Valor = undefined;
    
    await processoDeAluguel.save();
    return processoDeAluguel;
  }

  async cobrancaConcluida(webHook){
    console.log(webHook);
    if(webHook.event == "PAYMENT_RECEIVED"){
      const processoDeAluguel = await this.processoDeAluguelModel.findById(webHook.payment.externalReference);
      if(processoDeAluguel){

      if(processoDeAluguel.Pagamento.TipoRecebimento == "Pix"){
        const transacaoPix: TransferenciaPix = {
          value: processoDeAluguel.Pagamento.Valor,
          pixAddressKey: processoDeAluguel.Pagamento.PixRecebedor.Chave,
          pixAddressKeyType: processoDeAluguel.Pagamento.PixRecebedor.Tipo,
        }

        try{
          const asaas = await this.asaasService.criarTransferenciaPix(transacaoPix);
          processoDeAluguel.Status = "Transação Concluida";
          processoDeAluguel.Pagamento.Status = "RECEIVED";
        }catch(e){
          processoDeAluguel.Status = "Transação Falhada";
          processoDeAluguel.Pagamento.Status = "FAILED";
        }

      }else if(processoDeAluguel.Pagamento.TipoRecebimento == "ContaBancaria"){
      //   const transacaoConta: TransferenciaConta = {
      //     value: processoDeAluguel.Pagamento.Valor,
      //     bankAccount: processoDeAluguel.Pagamento.ContaBancariaRecebedor.Agencia
      //   }
      }
        await processoDeAluguel.save();
        return processoDeAluguel;
      }
    }
  }

  async findOne(id: string) {
    const foundUser = await this.processoDeAluguelModel.findById(id);
    return foundUser;
  }

}

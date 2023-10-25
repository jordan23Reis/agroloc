import { Injectable } from '@nestjs/common';
import { CreateProcessoDeAluguelDto } from './dto/create-processo-de-aluguel.dto';
import { UpdateProcessoDeAluguelDto } from './dto/update-processo-de-aluguel.dto';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';

@Injectable()
export class ProcessoDeAluguelService {
  constructor(
    private usersService: UsersService,
    private maquinaService: MaquinaService
  ) { }


  async create(idMaquina: string, idLocador:string, idLocatario) {
    const maquina = await this.maquinaService.findOne(idMaquina);
    const locador = await this.usersService.findOne(idLocador);
    const locatario = await this.usersService.findOne(idLocatario);
    const ProcessoDeAluguel = {
      Status: "A aceitar",
      Maquina: {
        idMaquina: maquina._id,
        Nome: maquina.Nome,
        ImagemPrincipal: {
          Url: maquina.ImagemPrincipal.Url,
          NomeArquivo: maquina.ImagemPrincipal.NomeArquivo
        }
      },
      Pagamento: {


        PixRecebedor: {
          Chave: locador.InformacoesBancarias.Pix.Chave,
          Tipo: locador.InformacoesBancarias.Pix.Tipo
        },
        ContaBancariaRecebedor:{
          Agencia: locador.InformacoesBancarias.ContaBancaria.Agencia,
          Conta: locador.InformacoesBancarias.ContaBancaria.Conta
        }

      },
      Envolvidos:{
        Locador: {
          idLocador: locador._id,
          Nome: locador.CadastroComum.Nome,
          Foto: {
            Url: locador.CadastroComum.Foto.Url,
            NomeArquivo: locador.CadastroComum.Foto.NomeArquivo
          }
        },
        Locatario: {
          idLocatario: locatario._id,
          Nome: locatario.CadastroComum.Nome,
          Foto: {
            Url: locatario.CadastroComum.Foto.Url,
            NomeArquivo: locatario.CadastroComum.Foto.NomeArquivo
      }
      }
    }
  }
  }

  findAll() {
    return `This action returns all processoDeAluguel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processoDeAluguel`;
  }

  update(id: number, updateProcessoDeAluguelDto: UpdateProcessoDeAluguelDto) {
    return `This action updates a #${id} processoDeAluguel`;
  }

  remove(id: number) {
    return `This action removes a #${id} processoDeAluguel`;
  }
}

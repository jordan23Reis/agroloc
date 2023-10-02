import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FullAvaliacaoDto } from './dto/full-avaliacao.dto';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Avaliacao } from './entities/avaliacao.entity';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';
import { AvaliacaoTipos } from '@agroloc/shared/util';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectModel(Avaliacao.name) private avaliacaoModel: Model<Avaliacao>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    @Inject(forwardRef(() => MaquinaService))
    private maquinaService: MaquinaService
    ){}


  async criarNotaGeralMaquina(idMaquina: string){
    let maquina = await this.maquinaService.findOne(idMaquina);
    maquina = await maquina.populate('Avaliacoes');

    let somaNotas = 0;
    if(maquina.Avaliacoes.length != 0){
      maquina.Avaliacoes.forEach(avaliacao => {
        somaNotas += avaliacao.Nivel;
      });
      const notaGeral = somaNotas / maquina.Avaliacoes.length;
      maquina.NotaGeral = notaGeral;
      await maquina.save();
    }else{
      maquina.NotaGeral = undefined;
      await maquina.save();
    }
  }

  async criarNotaGeralFreteiro(idFreteiro: string){
    let freteiro = await this.userService.findOne(idFreteiro);
    freteiro = await freteiro.populate('CadastroFreteiro.Avaliacoes');

    let somaNotas = 0;
    if(freteiro.CadastroFreteiro.Avaliacoes.length != 0){
      freteiro.CadastroFreteiro.Avaliacoes.forEach(avaliacao => {
        somaNotas += avaliacao.Nivel;
      });
      const notaGeral = somaNotas / freteiro.CadastroFreteiro.Avaliacoes.length;
      freteiro.CadastroFreteiro.NotaGeral = notaGeral;
      await freteiro.save();
    }else{
      freteiro.CadastroFreteiro.NotaGeral = undefined;
      await freteiro.save();
    }
  }


  async criarAvaliacaoMaquina(idUsuario: string, idMaquina: string, createAvaliacaoDto: CreateAvaliacaoDto){
    const usuarioAvaliador = await this.userService.findOne(idUsuario);

    const avaliacaoDto = {
      Nivel: createAvaliacaoDto.Nivel,  
      Tipo: AvaliacaoTipos.Maquina,
      Comentario: createAvaliacaoDto.Comentario,
      UsuarioAvaliador: {
        idUsuarioAvaliador: idUsuario,
        Nome:usuarioAvaliador.CadastroComum.Nome + " " + usuarioAvaliador.CadastroComum.Sobrenome,
        Foto: {
          Url: undefined,
          NomeArquivo: undefined
        }
      }}

      if(usuarioAvaliador.CadastroComum.Foto){
        const Foto = {
          Url: usuarioAvaliador.CadastroComum.Foto.Url,
          NomeArquivo: usuarioAvaliador.CadastroComum.Foto.NomeArquivo
        }
        avaliacaoDto.UsuarioAvaliador.Foto = Foto;
      }else{
        avaliacaoDto.UsuarioAvaliador.Foto = undefined;
      }

      const createdAvaliacao = await this.avaliacaoModel.create(avaliacaoDto);
      const maquinaAvaliada = await this.maquinaService.findOne(idMaquina);
      maquinaAvaliada.Avaliacoes.push(createdAvaliacao._id);
      await maquinaAvaliada.save();
      await this.criarNotaGeralMaquina(idMaquina);
      return createdAvaliacao;
    }

  

  async editarAvaliacaoMaquina(idAvaliacao: string, updateAvaliacaoDto: UpdateAvaliacaoDto){
    const foundAvaliacao = await this.findOne(idAvaliacao);
    foundAvaliacao.Nivel = updateAvaliacaoDto.Nivel;
    foundAvaliacao.Comentario = updateAvaliacaoDto.Comentario;
    await foundAvaliacao.save();
    const maquinaAvaliada = await this.maquinaService.findOneCustom({
      Avaliacoes: {
        $elemMatch: {
          $eq: idAvaliacao
        }
      }
    })
    await this.criarNotaGeralMaquina(maquinaAvaliada.id);
    return foundAvaliacao;
  }

  async deletarAvaliacaoMaquina(idAvaliacao: Avaliacao){
    const avaliacaoDeletada = await this.avaliacaoModel.findByIdAndDelete(idAvaliacao);
    const maquinaAvaliada = await this.maquinaService.findOneCustom({
      Avaliacoes: {
        $elemMatch: {
          $eq: idAvaliacao
        }
      }
    })
    maquinaAvaliada.Avaliacoes = maquinaAvaliada.Avaliacoes.filter(avaliacao => avaliacao != idAvaliacao);
    await maquinaAvaliada.save();
    await this.criarNotaGeralMaquina(maquinaAvaliada.id);
    return avaliacaoDeletada;
  }



  async criarAvaliacaoFreteiro(idUsuario: string, idFreteiro: string, createAvaliacaoDto: CreateAvaliacaoDto){
    const usuarioAvaliador = await this.userService.findOne(idUsuario);

    const avaliacaoDto = {
      Nivel: createAvaliacaoDto.Nivel,  
      Tipo: AvaliacaoTipos.Freteiro,
      Comentario: createAvaliacaoDto.Comentario,
      UsuarioAvaliador: {
        idUsuarioAvaliador: idUsuario,
        Nome: usuarioAvaliador.CadastroComum.Nome + " " + usuarioAvaliador.CadastroComum.Sobrenome,
        Foto: {
          Url: undefined,
          NomeArquivo: undefined
        }
      }}

      if(usuarioAvaliador.CadastroComum.Foto){
        const Foto = {
          Url: usuarioAvaliador.CadastroComum.Foto.Url,
          NomeArquivo: usuarioAvaliador.CadastroComum.Foto.NomeArquivo
        }
        avaliacaoDto.UsuarioAvaliador.Foto = Foto;
      }else{
        avaliacaoDto.UsuarioAvaliador.Foto = undefined;
      }

      const createdAvaliacao = await this.avaliacaoModel.create(avaliacaoDto);
      const freteiroAvaliado = await this.userService.findOne(idFreteiro);
      freteiroAvaliado.CadastroFreteiro.Avaliacoes.push(createdAvaliacao);
      await freteiroAvaliado.save();
      await this.criarNotaGeralFreteiro(idFreteiro)
      return createdAvaliacao;
  }

  async editarAvaliacaoFreteiro(idAvaliacao: string, updateAvaliacaoDto: UpdateAvaliacaoDto){
    const foundAvaliacao = await this.findOne(idAvaliacao);
    foundAvaliacao.Nivel = updateAvaliacaoDto.Nivel;
    foundAvaliacao.Comentario = updateAvaliacaoDto.Comentario;
    await foundAvaliacao.save();
    const freteiroAvaliado = await this.userService.findOneCustom({
      "CadastroFreteiro.Avaliacoes": {
        $elemMatch: {
          $eq: idAvaliacao
        }
      }
    })
    await this.criarNotaGeralFreteiro(freteiroAvaliado.id)
    return foundAvaliacao;
  }

  async deletarAvaliacaoFreteiro(idAvaliacao: Avaliacao){
    const avaliacaoDeletada = await this.avaliacaoModel.findByIdAndDelete(idAvaliacao);
    const freteiroAvaliado = await this.userService.findOneCustom({
      "CadastroFreteiro.Avaliacoes": {
        $elemMatch: {
          $eq: idAvaliacao
        }
      }
    })
    freteiroAvaliado.CadastroFreteiro.Avaliacoes = freteiroAvaliado.CadastroFreteiro.Avaliacoes.filter(avaliacao => avaliacao != idAvaliacao);
    await freteiroAvaliado.save();
    await this.criarNotaGeralFreteiro(freteiroAvaliado.id)
    return avaliacaoDeletada;
  }

  async findOne(id: string){
    const foundAvaliacao = await this.avaliacaoModel.findById(id);
    return foundAvaliacao;
  }

  async find(query){
    const foundAvaliacoes = await this.avaliacaoModel.find(query);
    return foundAvaliacoes;
  }

}

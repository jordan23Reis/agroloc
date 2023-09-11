import { Injectable } from '@nestjs/common';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { Maquina } from './entities/maquina.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MaquinaService {
  constructor(@InjectModel(Maquina.name) private maquinaModel: Model<Maquina>){}

  create(createMaquinaDto: CreateMaquinaDto) {
    const createdMaquina = this.maquinaModel.create(createMaquinaDto);
    return createdMaquina;
  }


  find(query){
    const resPerPage = Number(query.quantidadePorPagina) || 0;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage -1);

    const busca = query.busca ? {
      Nome: {
        $regex: query.busca,
        $options: "i"
      }
    } : {}

    const categoria = query.categoria ? {
      "Categoria.Nome": query.categoria
    } : {}

    const tipoPreco = query.tipoPreco ? {
      "Preco.Tipo.Nome": query.tipoPreco
    } : {}

    const precoMin = query.precoMin ? {
      "Preco.ValorPorTipo": { 
        $gte: Number(query.precoMin)
      }
    } : {}

    const precoMax = query.precoMax ? {
      "Preco.ValorPorTipo": { 
        $lte: Number(query.precoMax)
      }
    } : {}

    const ordenar = query.ordernarPor == "OrdemAlfabetica" ? {
      Nome: "asc"
    } : {}

    //"Nome": "asc"

    const maquinas = this.maquinaModel.find({...busca, ...categoria, ...tipoPreco, ...precoMin,  ...precoMax}).limit(resPerPage).skip(skip).sort({});
    return maquinas;
  }

  findOne(id: string) {
    const foundMaquina = this.maquinaModel.findById(id);
    return foundMaquina;
  }

  update(id: string, updateMaquinaDto: UpdateMaquinaDto) {
    const updatedMaquina = this.maquinaModel.findByIdAndUpdate(id, updateMaquinaDto);
    return updatedMaquina;
  }

  remove(id: string) {
    const foundMaquina = this.maquinaModel.findByIdAndRemove(id);
    return foundMaquina;
  }
}

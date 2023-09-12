import { Injectable } from '@nestjs/common';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { Maquina } from './entities/maquina.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MaquinaService {
  constructor(
    @InjectModel(Maquina.name) private maquinaModel: Model<Maquina>
  ) {}

  create(createMaquinaDto: CreateMaquinaDto) {
    const createdMaquina = this.maquinaModel.create(createMaquinaDto);
    return createdMaquina;
  }

  find(query) {
    const resPerPage = Number(query.quantidadePorPagina) || 0;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const busca = query.busca
      ? {
          Nome: {
            $regex: query.busca,
            $options: 'i',
          },
        }
      : {};

    const categoria = query.categoria
      ? {
          'Categoria.Nome': query.categoria,
        }
      : {};

    const tipoPreco = query.tipoPreco
      ? {
          'Preco.Tipo.Nome': query.tipoPreco,
        }
      : {};

    const precoMin = query.precoMin
      ? {
          'Preco.ValorPorTipo': {
            $gte: Number(query.precoMin),
          },
        }
      : {};

    const precoMax = query.precoMax
      ? {
          'Preco.ValorPorTipo': {
            $lte: Number(query.precoMax),
          },
        }
      : {};

    let ordenar;

    switch (query.ordernarPor) {
      case 'MaisBemAvaliado':
        ordenar = {
          //A IMPLEMENTAR QUANDO AVALIACOES TIVER IMPLEMENTADA
        };
        break;
      case 'OrdemAlfabetica':
        ordenar = {
          Nome: 'asc',
        };
        break;
      case 'OrdemAlfabeticaInvertida':
        ordenar = {
          Nome: 'desc',
        };
        break;
      case 'MaisRecentementeCriado':
        ordenar = {
          createdAt: 'desc',
        };
        break;
      case 'MenosRecentementeCriado':
        ordenar = {
          createdAt: 'asc',
        };
      break;
      case 'MaisRecentementeAtualizado':
        ordenar = {
          updatedAt: 'desc',
        };
      break;
      case 'MenosRecentementeAtualizado':
        ordenar = {
          updatedAt: 'asc',
        };
      break;
      default:
        ordenar = {};
    }


    const maquinas = this.maquinaModel
      .find({ ...busca, ...categoria, ...tipoPreco, ...precoMin, ...precoMax })
      .limit(resPerPage)
      .skip(skip)
      .sort({ ...ordenar });
    return maquinas;
  }

  findOne(id: string) {
    const foundMaquina = this.maquinaModel.findById(id);
    return foundMaquina;
  }

  update(id: string, updateMaquinaDto: UpdateMaquinaDto) {
    const updatedMaquina = this.maquinaModel.findByIdAndUpdate(
      id,
      updateMaquinaDto
    );
    return updatedMaquina;
  }

  remove(id: string) {
    const foundMaquina = this.maquinaModel.findByIdAndRemove(id);
    return foundMaquina;
  }

  createImagemPrincipal(Imagem: Express.Multer.File, idMaquina: string){
    console.log(Imagem);
  }

  createImagemsSecundarias(Imagens: Array<Express.Multer.File>, idMaquina: string){
    console.log(Imagens);
  }

  deleteImagemsSecundarias(foto: string, idmaquina: string){
    console.log(foto);
  }

}

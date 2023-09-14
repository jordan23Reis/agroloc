import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { Maquina } from './entities/maquina.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { unlinkSync } from 'fs';
import { MaquinaConfigs, MaquinaLimites } from '@agroloc/shared/util';
import Imagem from './dto/imagem.interface';
import { join } from 'path';

@Injectable()
export class MaquinaService {
  constructor(
    @InjectModel(Maquina.name) private maquinaModel: Model<Maquina>,
    private cloudinaryService: CloudinaryService
  ) {}

  create(createMaquinaDto: CreateMaquinaDto) {
    try {
      createMaquinaDto.ImagemPrincipal = undefined;
      createMaquinaDto.ImagensSecundarias = [];
      //implementar aqui colocar avaliação nula
      const createdMaquina = this.maquinaModel.create(createMaquinaDto);
      return createdMaquina;
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  find(query) {
    try {
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
        .find({
          ...busca,
          ...categoria,
          ...tipoPreco,
          ...precoMin,
          ...precoMax,
        })
        .limit(resPerPage)
        .skip(skip)
        .sort({ ...ordenar });
      return maquinas;
    } catch (e) {
      return e;
    }
  }

  findOne(id: string) {
    try {
      const foundMaquina = this.maquinaModel.findById(id);
      return foundMaquina;
    } catch (e) {
      return e;
    }
  }

  async update(id: string, updateMaquinaDto: UpdateMaquinaDto) {
    try {
      const currentMaquina = await this.maquinaModel.findById(id);
      if (updateMaquinaDto.ImagemPrincipal || currentMaquina.ImagemPrincipal) {
        updateMaquinaDto.ImagemPrincipal = currentMaquina.ImagemPrincipal;
      }

      updateMaquinaDto.ImagensSecundarias = currentMaquina.ImagensSecundarias;
      const updatedMaquina = this.maquinaModel.findByIdAndUpdate(
        id,
        updateMaquinaDto,
        { new: true }
      );
      return updatedMaquina;
    } catch (e) {
      return e;
    }
  }

  async remove(id: string) {
    try {
      //implementar aqui no futuro, caso a maquina esteja atrelada a algum processo, nao excluir a imagem principal
      await this.deleteImagemPrincipal(id);
      const foundMaquina = await this.maquinaModel.findById(id);

      await Promise.all(
        foundMaquina.ImagensSecundarias.map(async (Imagem) => {
          await this.deleteImagemSecundaria(Imagem.NomeArquivo, id);
          return 'Ok';
        })
      );

      const deletedMaquina = await this.maquinaModel.findByIdAndDelete(id);
      return deletedMaquina;
    } catch (e) {
      return e;
    }
  }

  async createImagemPrincipal(imagem: Express.Multer.File, idMaquina: string) {
    try {
      const maquina = await this.maquinaModel.findById(idMaquina);
      const result = await this.cloudinaryService.uploadImagem(
        imagem,
        MaquinaConfigs.caminhoImagemPrincipalCloudinary,
        MaquinaLimites.tiposPermitidos
      );

      unlinkSync(
        join(
          __dirname,
          MaquinaConfigs.caminhoImagemPrincipalLocal + imagem.filename
        )
      );

      // console.log(result);

      if (maquina.ImagemPrincipal !== undefined) {
        const ImagemADeletar = {
          Url: maquina.ImagemPrincipal.Url,
          NomeArquivo: maquina.ImagemPrincipal.NomeArquivo,
        };
        this.deleteImagemMaquina(
          ImagemADeletar,
          MaquinaConfigs.caminhoImagemPrincipalCloudinary
        );
      }

      const ImagemPrincipal = {
        ImagemPrincipal: {
          Url: result.secure_url,
          NomeArquivo: result.original_filename,
        },
      };

      await this.maquinaModel.updateOne(
        { _id: idMaquina },
        { $set: ImagemPrincipal }
      );

      const resposta = {
        message: 'Criado/atualizado com sucesso!',
        urlFoto: result.secure_url,
        nomeArquivo: result.original_filename,
      };

      return resposta;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemPrincipal(id: string) {
    try {
      const Maquina = new this.maquinaModel(
        await this.maquinaModel.findById(id)
      );
      const ImagemAchada = Maquina.ImagemPrincipal;

      if (ImagemAchada === undefined) {
        throw new BadRequestException('Algo de ruim ocorreu', {
          cause: new Error(),
          description: 'Essa imagem não existe',
        });
      }

      const ImagemADeletar = {
        Url: ImagemAchada.Url,
        NomeArquivo: ImagemAchada.NomeArquivo,
      };

      Maquina.ImagemPrincipal = undefined;

      this.deleteImagemMaquina(
        ImagemADeletar,
        MaquinaConfigs.caminhoImagemPrincipalCloudinary
      );

      await Maquina.save();

      const resposta = {
        message: 'Foto removida com sucesso!',
        FotoRemovida: { ...ImagemADeletar },
      };

      return resposta;
    } catch (e) {
      return e;
    }
  }

  async createImagemsSecundarias(
    imagens: Array<Express.Multer.File>,
    idMaquina: string
  ) {
    try {
      const maquina = await this.maquinaModel.findById(idMaquina);
      const imagensAdicionadas = await this.criaMultiplasImagens(imagens);
      maquina.ImagensSecundarias.push(...imagensAdicionadas);
      maquina.save();
      const resposta = {
        message: 'Criadas com sucesso!',
        Fotos: [...imagensAdicionadas],
      };
      return resposta;
    } catch (e) {
      return e;
    }
  }

  async criaMultiplasImagens(imagens: Array<Express.Multer.File>) {
    return await Promise.all(
      imagens.map(async (i) => {
        const imagemCriada = await this.cloudinaryService.uploadImagem(
          i,
          MaquinaConfigs.caminhoImagensSecundariasCloudinary,
          MaquinaLimites.tiposPermitidos
        );
        const ImagemInfo = {
          Url: imagemCriada.secure_url,
          NomeArquivo: imagemCriada.original_filename,
        };
        unlinkSync(
          join(
            __dirname,
            MaquinaConfigs.caminhoImagensSecundariasLocal + i.filename
          )
        );
        return ImagemInfo;
      })
    );
  }

  async deleteImagemSecundaria(filename: string, id: string) {
    try {
      const Maquina = new this.maquinaModel(
        await this.maquinaModel.findById(id)
      );
      const ImagemAchada = Maquina.ImagensSecundarias.find(
        (ImagensSecundarias) => ImagensSecundarias.NomeArquivo === filename
      );

      if (ImagemAchada === undefined) {
        throw new BadRequestException('Algo de ruim ocorreu', {
          cause: new Error(),
          description: 'Essa imagem não existe',
        });
      }

      const ImagemADeletar = {
        Url: ImagemAchada.Url,
        NomeArquivo: ImagemAchada.NomeArquivo,
      };
      Maquina.ImagensSecundarias = Maquina.ImagensSecundarias.filter(
        (ImagensSecundarias) =>
          ImagensSecundarias.NomeArquivo != ImagemADeletar.NomeArquivo
      );

      this.deleteImagemMaquina(
        ImagemADeletar,
        MaquinaConfigs.caminhoImagensSecundariasCloudinary
      );

      await Maquina.save();

      const resposta = {
        message: 'Foto removida com sucesso!',
        FotoRemovida: { ...ImagemADeletar },
      };

      return resposta;
    } catch (e) {
      return e;
    }
  }

  async deleteImagemMaquina(imagem: Imagem, caminhoImagem: string) {
    try {
      const result = await this.cloudinaryService.deletaImagem(
        imagem.NomeArquivo,
        caminhoImagem
      );
      return result;
    } catch (e) {
      throw new BadRequestException('Algo de ruim ocorreu', {
        cause: new Error(),
        description:
          'Não foi possivel deletar a imagem principal atual, ela provavelmente não existe.',
      });
    }
  }
}

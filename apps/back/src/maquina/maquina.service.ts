import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUpdateMaquinaDto } from './dto/create-update-maquina.dto';
import { Maquina } from './entities/maquina.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  MaquinaImagemConfigs,
  MaquinaImagemLimites,
} from '@agroloc/shared/util';
import { ImagemService } from '../imagem/imagem.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MaquinaService {
  constructor(
    @InjectModel(Maquina.name) private maquinaModel: Model<Maquina>,
    private imagemService: ImagemService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async create(createMaquinaDto: CreateUpdateMaquinaDto, request) {
    try{
    const idUsuario = request.user.IdUsuario
    const usuarioDono = await this.usersService.findOne(idUsuario);
    const maquinaDtoComIdUsuario = {
      ...createMaquinaDto, 
      DonoDaMaquina: {
        idDono: idUsuario,
        Nome: usuarioDono.CadastroComum.Nome + " " + usuarioDono.CadastroComum.Sobrenome,
        Foto: usuarioDono.CadastroComum.Foto
      }};
      //QUANDO PRECO E CATEGORIA ESTIVEREM CRIADOS, VALIDAR ESSES DADOS AQUI
      const createdMaquina = await this.maquinaModel.create(maquinaDtoComIdUsuario);
      usuarioDono.Maquinas.push(createdMaquina.id);
      await usuarioDono.save();
      return createdMaquina;
    }catch(e){
      return e;
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

  async findOne(id: string) {
    try{
      const foundMaquina = await this.maquinaModel.findById(id);
      return foundMaquina;
    }catch(e){
      return e;
    }

  }

  async update(id: string, updateMaquinaDto: CreateUpdateMaquinaDto) {
    try{
      //QUANDO PRECO E CATEGORIA ESTIVEREM CRIADOS, VALIDAR ESSES DADOS AQUI
      const updatedMaquina = this.maquinaModel.findByIdAndUpdate(
        id,
        updateMaquinaDto,
        { new: true }
      );
      return updatedMaquina;
    }catch(e){
      return e;
    }
  }

  async remove(id: string, request) {
    try {
      const idUsuario = request.user.IdUsuario;
      const usuarioDono = await this.usersService.findOne(idUsuario);
      usuarioDono.Maquinas = usuarioDono.Maquinas.filter( (maq) => maq.toString() !== id);
      await usuarioDono.save();
      await this.deletarImagensAoExcluirMaquina(id);
      const deletedMaquina = await this.maquinaModel.findByIdAndDelete(id);
      return deletedMaquina;
    } catch (e) {
      return e;
    }
  }

  async deletarImagensAoExcluirMaquina(id: string) {
    //implementar aqui no futuro, caso a maquina esteja atrelada a algum processo, nao excluir a imagem principal
    await this.deleteImagemPrincipal(id);
    const foundMaquina = await this.maquinaModel.findById(id);

    await Promise.all(
      foundMaquina.ImagensSecundarias.map(async (Imagem) => {
        await this.deleteImagemSecundaria(Imagem.NomeArquivo, id);
        return 'Ok';
      })
    );
  }

  async createImagemPrincipal(imagem: Express.Multer.File, idMaquina: string) {
    try {
      let ImagemAtual = undefined;
      const maquina = await this.maquinaModel.findById(idMaquina);
      if (maquina.ImagemPrincipal) {
        ImagemAtual = {
          Url: maquina.ImagemPrincipal.Url,
          NomeArquivo: maquina.ImagemPrincipal.NomeArquivo,
        };
      }

      const result = await this.imagemService.createImagem(
        imagem,
        MaquinaImagemConfigs,
        MaquinaImagemLimites,
        ImagemAtual
      );

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

      return result.response;
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

      const response = this.imagemService.deleteImagem(
        MaquinaImagemConfigs.caminhoImagemPrincipalCloudinary,
        ImagemADeletar
      );

      Maquina.ImagemPrincipal = undefined;

      await Maquina.save();

      return response;
    } catch (e) {
      return e;
    }
  }

  async createImagemsSecundarias(
    imagens: Array<Express.Multer.File>,
    idMaquina: string
  ) {
    try {
      const result = await this.imagemService.createImagemsSecundarias(
        imagens,
        MaquinaImagemConfigs,
        MaquinaImagemLimites
      );
      const maquina = await this.maquinaModel.findById(idMaquina);
      maquina.ImagensSecundarias.push(...result.imagensAdicionadas);
      maquina.save();

      return result.response;
    } catch (e) {
      return e;
    }
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

      await this.imagemService.deleteImagem(
        MaquinaImagemConfigs.caminhoImagensSecundariasCloudinary,
        ImagemADeletar
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
}

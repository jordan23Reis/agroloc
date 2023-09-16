import { ImagemConfigs, ImagemLimites } from '@agroloc/shared/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import ImagemInfo from './dtos/imagem-info.interface';

@Injectable()
export class ImagemService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async createImagem(
    imagem: Express.Multer.File,
    configs: ImagemConfigs,
    limites: ImagemLimites,
    imagemAtualInfo: ImagemInfo = undefined
  ) {
    try {
      const result = await this.cloudinaryService.uploadImagem(
        imagem,
        configs.caminhoImagemPrincipalCloudinary,
        limites.tiposPermitidos
      );

      unlinkSync(
        join(__dirname, configs.caminhoImagemPrincipalLocal + imagem.filename)
      );

      if (imagemAtualInfo) {
        this.deleteImagem(
          configs.caminhoImagemPrincipalCloudinary,
          imagemAtualInfo
        );
      }

      result.response = {
        message: 'Imagem criada/atualizada com sucesso!',
        urlFoto: result.secure_url,
        nomeArquivo: result.original_filename,
      };

      return result;
    } catch (e) {
      return e;
    }
  }

  async deleteImagem(caminho, imagem: ImagemInfo) {
    try {
      await this.cloudinaryService.deletaImagem(imagem.NomeArquivo, caminho);
      const resposta = {
        message: 'Imagem removida com sucesso!',
        FotoRemovida: { ...imagem },
      };
      return resposta;
    } catch (e) {
      return new BadRequestException('Algo de ruim ocorreu', {
        cause: new Error(),
        description:
          'Não foi possivel deletar a imagem principal atual, ela provavelmente não existe.',
      });
    }
  }

  async createImagemsSecundarias(
    imagens: Array<Express.Multer.File>,
    configs: ImagemConfigs,
    limites: ImagemLimites
  ) {
    try {
      const imagensAdicionadas = await this.criaUmaPorUma(
        imagens,
        configs,
        limites
      );

      const result = {
        imagensAdicionadas,
        response: {
          message: 'Imagens criadas com sucesso!',
          Fotos: [...imagensAdicionadas],
        },
      };

      return result;
    } catch (e) {
      return e;
    }
  }

  async criaUmaPorUma(
    imagens: Array<Express.Multer.File>,
    configs: ImagemConfigs,
    limites: ImagemLimites
  ) {
    return await Promise.all(
      imagens.map(async (i) => {
        const imagemCriada = await this.cloudinaryService.uploadImagem(
          i,
          configs.caminhoImagensSecundariasCloudinary,
          limites.tiposPermitidos
        );
        const ImagemInfo = {
          Url: imagemCriada.secure_url,
          NomeArquivo: imagemCriada.original_filename,
        };
        unlinkSync(
          join(__dirname, configs.caminhoImagensSecundariasLocal + i.filename)
        );
        return ImagemInfo;
      })
    );
  }
}

import {
  ImageFile,
  ImagemService,
  MaquinaConfigs,
  MaquinaLimites,
  UseCase,
} from '@agroloc/shared/util';
import { CreateImagemPrincipalResposta, MaquinaService } from '../ports';

interface CreateImagemPrincipalDto {
  imagem: ImageFile;
  id: string;
}

export class CreateImagemPrincipalUseCase
  implements UseCase<CreateImagemPrincipalDto, CreateImagemPrincipalResposta>
{
  constructor(
    private readonly maquinaService: MaquinaService,
    private readonly imagemService: ImagemService
  ) {}

  async execute(createImagemPrincipalDto: CreateImagemPrincipalDto) {
    try {
      const resultadoUpload = await this.imagemService.uploadImagem(
        createImagemPrincipalDto.imagem,
        MaquinaConfigs.caminhoImagemPrincipalCloudinary,
        MaquinaLimites.tiposPermitidos
      );
      this.maquinaService.removeArquivoLocal(
        MaquinaConfigs.caminhoImagemPrincipalLocal,
        createImagemPrincipalDto.imagem.filename
      );

      const foundMaquina = await this.maquinaService.findOne(
        createImagemPrincipalDto.id
      );

      if (foundMaquina?.ImagemPrincipal) {
        this.imagemService.deletaImagem(
          foundMaquina.ImagemPrincipal.NomeArquivo,
          MaquinaConfigs.caminhoImagemPrincipalCloudinary
        );
      }

      const ImagemPrincipal = {
        Url: resultadoUpload.secure_url,
        NomeArquivo: resultadoUpload.original_filename,
      };

      this.maquinaService.updateMaquina(createImagemPrincipalDto.id, {
        ImagemPrincipal,
      });

      return {
        message: 'Imagem principal adicionada com sucesso!',
        urlFoto: ImagemPrincipal.Url,
        nomeArquivo: ImagemPrincipal.NomeArquivo,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}

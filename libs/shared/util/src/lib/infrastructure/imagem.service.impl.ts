import { splitByPipe } from '../formatting/split-by-pipe';
import { ImageFile, ImagemService } from '../ports/imagem.service';
import { v2 } from 'cloudinary';

export class ImagemServiceImpl implements ImagemService {
  async uploadImagem(
    imagem: ImageFile,
    caminho: string,
    tiposPermitidos: string
  ) {
    const result = await v2.uploader.upload(imagem.path, {
      folder: caminho,
      allowed_formats: splitByPipe(tiposPermitidos),
      use_filename: true,
      public_id: imagem.filename,
    });
    return result;
  }
  async deletaImagem(imagemNome: string, caminho: string): Promise<void> {
    const result = await v2.uploader.destroy(caminho + imagemNome);
    return result;
  }
}

import { v2 } from 'cloudinary';

export class CloudinaryService {
  converteTipo(tiposPermitidos: string): string[] {
    return tiposPermitidos.split('|');
  }

  async uploadImagem(
    imagem: Express.Multer.File,
    caminho: string,
    tiposPermitidos: string
  ) {
    const result = await v2.uploader.upload(imagem.path, {
      folder: caminho,
      allowed_formats: this.converteTipo(tiposPermitidos),
      use_filename: true,
      public_id: imagem.filename,
    });
    return result;
  }

  async deletaImagem(imagemNome: string, caminho: string) {
    const result = await v2.uploader.destroy(caminho + imagemNome);
    return result;
  }

  async aaaa() {
    return 'aaa';
  }
}

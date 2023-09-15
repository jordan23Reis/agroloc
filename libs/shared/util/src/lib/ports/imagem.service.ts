
export interface ImageFile {
  filename: string;
  path: string;
}

interface UploadApiResponse {
  secure_url: string;
  original_filename: string;
}

export abstract class ImagemService {
  abstract uploadImagem(
    imagem: ImageFile,
    caminho: string,
    tiposPermitidos: string
  ): Promise<UploadApiResponse>;
  abstract deletaImagem(imagemNome: string, caminho: string): Promise<void>;
}

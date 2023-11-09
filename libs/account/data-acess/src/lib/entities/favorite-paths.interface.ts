interface ItemFavorito {
    idItemFavorito: string;
    Nome: string;
    Tipo: string;
    ImagemPrincipal: {
      Url: string;
      NomeArquivo: string;
      _id: string;
    };
    _id: string;
  }
  
  export interface Favorito {
    _id: string;
    ItemFavorito: ItemFavorito;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
import { FavoritoSchema } from "./favorito.entity";


export async function FavoritoMiddlewares() {
  const schema = FavoritoSchema;
  schema.pre('findOneAndRemove', function () {
    console.log('AAA');
    //IMPLEMENTAR AQUI A REMOÇÃO DE TUDO ATRELADO A FAVORITO QUE DEVE SER REMOVIDO
  });

  schema.post('findOneAndUpdate', function () {
    console.log('BBBBBBBB');
    //IMPLEMENTAR AQUI A ATUALIZACAO DE TUDO ATRELADO A FAVORITO QUE DEVE SER ATUALIZADO
  });

  return schema;
}

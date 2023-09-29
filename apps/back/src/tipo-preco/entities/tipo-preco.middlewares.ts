import { TipoPrecoSchema } from "./tipo-preco.entity";

export async function TipoPrecoMiddlewares() {
  const schema = TipoPrecoSchema;
  schema.pre('findOneAndRemove', function () {
    console.log('AAA');
    //IMPLEMENTAR AQUI A REMOÇÃO DE TUDO ATRELADO A MAQUINA QUE DEVE SER REMOVIDO
  });

  schema.post('findOneAndUpdate', function () {
    console.log('BBBBBBBB');
    //IMPLEMENTAR AQUI A ATUALIZACAO DE TUDO ATRELADO A MAQUINA QUE DEVE SER ATUALIZADO
  });

  return schema;
}

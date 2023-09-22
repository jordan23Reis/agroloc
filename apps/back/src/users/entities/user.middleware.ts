import { UserSchema } from './user.entity';

export async function UserMiddlewares() {
  const schema = UserSchema;
  schema.pre('findOneAndRemove', function () {
    console.log('AAA');
    //IMPLEMENTAR AQUI A REMOÇÃO DE TUDO ATRELADO A MAQUINA QUE DEVE SER REMOVIDO
  });

  schema.post('findOneAndUpdate', function () {
    console.log('BBBBBBBB');
    //IMPLEMENTAR AQUI A ATUALIZACAO DE TUDO ATRELADO A MAQUINA QUE DEVE SER ATUALIZADO
  });

  schema.virtual("NomeCompleto").get(function () {
    return this.CadastroComum.Nome + " " + this.CadastroComum.Sobrenome;
  });

  return schema;
}

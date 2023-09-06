import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CadastroFreteiro } from '../entities/user.entity';

  class CadastroCompletoUsuario {
    _id: mongoose.Schema.Types.ObjectId;
    nome: string;
    Senha: string;
    Cpf: string;
    Cnpj: string;
  } 


  export class CreateUserDto {

CadastroCompleto: CadastroCompletoUsuario;

  }



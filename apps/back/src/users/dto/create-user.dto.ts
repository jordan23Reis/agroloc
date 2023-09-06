import { IsNotEmpty, IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import mongoose from 'mongoose';

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



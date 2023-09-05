import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CadastroFreteiro } from '../entities/user.entity';

export class CreateUserDto {
  CadastroCompleto: object;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  nome: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  senha: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  tipo: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  cpf: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  cnpj: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  registro: string;
}

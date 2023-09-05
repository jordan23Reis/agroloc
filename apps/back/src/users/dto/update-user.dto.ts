import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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

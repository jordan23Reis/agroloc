import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUserService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string): Promise<any> {
    const user = await this.usersService.findOneCredentials(email);
    if(!user) {
      throw new UnauthorizedException('Dados Inválidos!')
    };

    const payload = { IdUsuario: user._id, EmailUsuario: user.Login.Email, TipoUsuario: user.Login.Tipo };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validarSenha(senha: string, senhaRegistrada: string) {
    return await bcrypt.compare(senha, senhaRegistrada);
  }
}

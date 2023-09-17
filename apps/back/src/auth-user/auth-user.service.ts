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

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneCredentials(email);

    if (!(await this.validarSenha(pass, user?.Login.Senha))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.Login.Email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validarSenha(senha: string, senhaRegistrada: string) {
    return await bcrypt.compare(senha, senhaRegistrada);
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserService } from '../auth-user.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthUserService, private usersService: UsersService) {
    super({
        usernameField: 'Email',
        passwordField: 'Senha'
  });
  }

  async validate(Email: string, Senha: string): Promise<any> {

    const usuarioAchado = await this.usersService.findOneCredentials(Email);
    if (!usuarioAchado) {
      throw new UnauthorizedException("Dados Inválidos!");
    }
    
    const user = await this.authService.validarSenha(Senha, usuarioAchado.Login.Senha);

    if (!user) {
      throw new UnauthorizedException("Dados Inválidos!");
    }
    return user;
  }
}
import { Injectable } from '@nestjs/common';
import { UsuarioTipo } from './UsuarioTipo';

@Injectable()
export class UsuarioAdministradorGuard extends UsuarioTipo {
constructor(){
super("Administrador")
}
}
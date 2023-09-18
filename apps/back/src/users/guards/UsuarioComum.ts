import { Injectable } from '@nestjs/common';
import { UsuarioTipo } from './UsuarioTipo';

@Injectable()
export class UsuarioComumGuard extends UsuarioTipo {
constructor(){
super("Comum")
}
}
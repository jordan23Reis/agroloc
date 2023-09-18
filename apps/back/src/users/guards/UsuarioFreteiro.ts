import { Injectable } from '@nestjs/common';
import { UsuarioTipo } from './UsuarioTipo';

@Injectable()
export class UsuarioFreteiroGuard extends UsuarioTipo {
constructor(){
super("Freteiro")
}
}
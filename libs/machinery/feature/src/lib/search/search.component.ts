import { Component, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'agroloc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  platform = inject(Platform);
  isMobile = this.platform.ANDROID || this.platform.IOS;

  categories = ['veiculos', 'maquinas', 'implementos'];

  packages = [
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      avaliacao: '4.9',
      locatario: 'Loja oficial Apple',
      like: 'like aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado',
      preco: 'R$4.249,00',
      avaliacao: '4.9',
      locatario: 'Loja oficial Apple',
      like: 'like aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado',
      preco: 'R$4.249,00',
      avaliacao: '4.9',
      locatario: 'Loja oficial Apple',
      like: 'like aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado',
      preco: 'R$4.249,00',
      avaliacao: '4.9',
      locatario: 'Loja oficial Apple',
      like: 'like aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado',
      preco: 'R$4.249,00',
      avaliacao: '4.9',
      locatario: 'Loja oficial Apple',
      like: 'like aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado',
      preco: 'R$4.249,00',
      avaliacao: '4.9',
      locatario: 'Loja oficial Apple',
      like: 'like aqui',
    },
  ];
}

import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'agroloc-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  platform = inject(Platform);

  isMobile = this.platform.ANDROID || this.platform.IOS;
  favoriteList = [
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
    {
      foto: 'foto aqui',
      titulo:
        'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
      preco: 'R$4.249,00',
      delete: 'delete aqui',
    },
  ];
}

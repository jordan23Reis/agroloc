import { AccountService } from '@agroloc/account/data-acess';
import { MachineryService, Maquina } from '@agroloc/machinery/data-access';
import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, catchError, debounceTime, map, take } from 'rxjs';

@Component({
  selector: 'agroloc-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  platform = inject(Platform);
  accountService = inject(AccountService);
  machineryService = inject(MachineryService);
  snackbar = inject(MatSnackBar);

  favoriteMachinery = new ReplaySubject<Maquina[]>(1);
  favoriteMachinery$ = this.favoriteMachinery.asObservable();

  userData = this.accountService.userAccount$
    .pipe(debounceTime(1000))
    .subscribe((response) => {
      const favoritos: Maquina[] = [];
      response.MaquinasFavoritas?.forEach((value) => {
        this.machineryService
          .getMachinery(value)
          .pipe(
            take(1),
            catchError((error) => {
              throw new Error('Erro ao buscar lista de maquinas favoritas');
            })
          )
          .subscribe((response) => {
            favoritos.push(response);
            this.favoriteMachinery.next(favoritos);
          });
      });
    });

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

import {
  AccountService,
  AuthService,
  Favorito,
} from '@agroloc/account/data-acess';
import { MachineryService, Maquina } from '@agroloc/machinery/data-access';
import { SearchService } from '@agroloc/shared/data-access';
import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
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
  authService = inject(AuthService);
  searchService = inject(SearchService);
  snackbar = inject(MatSnackBar);

  filter: string;

  favoriteMachinery = new ReplaySubject<Favorito[]>(1);
  favoriteMachinery$ = this.favoriteMachinery.asObservable().pipe(
    map((response) => {
      if (this.filter) {
        console.log(response);

        console.log(response[1]);

        return response;
      }
      return response;
    })
  );

  userData = this.accountService.userAccount$
    .pipe(debounceTime(1000))
    .subscribe((response) => {
      const favoritos: Favorito[] = [];

      response.MaquinasFavoritas?.forEach((value) => {
        this.accountService
          .findFavoritos(value)
          .pipe(
            take(1),
            catchError((error) => {
              throw new Error('Erro ao buscar lista de maquinas favoritas');
            })
          )
          .subscribe((response) => {
            favoritos.push(response[0]);
          });
      });
      this.favoriteMachinery.next(favoritos);
    });

  isMobile = this.platform.ANDROID || this.platform.IOS;

  removeFavorite(idMaquina: string) {
    console.log('passei');

    this.authService.userProfile$.pipe(take(1)).subscribe((response) => {
      const idUser = response.IdUsuario;
      this.accountService
        .removeMaquinaFavorita(response.IdUsuario, idMaquina)
        .subscribe((response) => {
          this.accountService.nextAccount(idUser);
          this.snackbar.open('Maquina removida!', undefined, {
            duration: 3000,
          });
        });
    });
  }

  selectItem(idItem: string) {
    this.searchService.onSelectItem(idItem);
  }

  favoriteFilter(event: MatChipSelectionChange) {
    if (event.selected) {
      this.filter = event.source.value;
    } else {
      this.filter = '';
    }
    this.authService.userProfile$.pipe(take(1)).subscribe((response) => {
      this.accountService.nextAccount(response.IdUsuario);
    });
  }
}

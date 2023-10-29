import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AccountService,
  AuthService,
  AuthStorage,
} from '@agroloc/account/data-acess';
import { lastValueFrom, take } from 'rxjs';
@Component({
  selector: 'agroloc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';
  platform = inject(Platform);
  router = inject(Router);
  location = inject(Location);
  snackBar = inject(MatSnackBar);
  authStorage = inject(AuthStorage);
  authService = inject(AuthService);
  accountService = inject(AccountService);

  isMobile = this.platform.ANDROID || this.platform.IOS;
  currentUrl = this.location.path() ?? '';
  filterUrl = this.prefixRemove(this.currentUrl);

  ngOnInit() {
    if (this.filterUrl !== '') {
      if (this.isMobile) {
        this.router.navigateByUrl(`/mob/${this.filterUrl}`);
      } else {
        this.router.navigateByUrl(`/web/${this.filterUrl}`);
      }
    } else {
      if (this.isMobile) {
        this.router.navigate(['mob']);
      } else {
        this.router.navigate(['web']);
      }
    }
    this.snackBar.open('Bem-Vindo ao Agroloc', 'Fechar', {
      duration: 3000,
    });
    this.accountCheck();
  }

  accountCheck() {
    this.authService.IsLogged().subscribe((response) => {
      if (response) {
        this.authService.nextProfile();

        this.authService.userProfile$.pipe(take(1)).subscribe((response) => {
          this.accountService.nextAccount(response.IdUsuario);
        });

        this.accountService.userAccount$.subscribe((response) => {
          if (response) {
            setTimeout(() => {
              this.snackBar.open(
                `Seja Bem-Vindo, ${
                  response?.CadastroComum === undefined
                    ? 'Usuario'
                    : response?.CadastroComum.Nome
                }`,
                undefined,
                {
                  duration: 3000,
                }
              );
            }, 2000);
          }
        });
      }
    });
  }

  prefixRemove(url: string): string {
    if (url.startsWith('/web')) {
      return url.substring(5);
    } else if (url.startsWith('/mob')) {
      return url.substring(5);
    } else if (url.startsWith('/')) {
      return url.substring(1);
    }
    return url;
  }
}

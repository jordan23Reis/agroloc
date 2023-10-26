import {
  AccountService,
  AuthService,
  AuthStorage,
  Login,
} from '@agroloc/account/data-acess';
import { UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'agroloc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AccountLoginComponent {
  _formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  platform = inject(Platform);
  router = inject(Router);
  authService = inject(AuthService);
  accountService = inject(AccountService);
  authStorage = inject(AuthStorage);
  snackBar = inject(MatSnackBar);

  account = this._formBuilder.group({
    Email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinEmail),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxEmail),
      ],
    ],
    Senha: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSenha),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSenha),
      ],
    ],
  });

  firstPassword = true;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  register() {
    this.router.navigate(['web', 'register']);
  }

  SingIn() {
    if (this.account.valid) {
      const request = this.authService.SingIn(this.account.value).subscribe(
        (response) => {
          this.authStorage.removeAcessToken();
          this.authStorage.setAcessToken(response.access_token);

          if (this.authStorage.getAcessToken()) {
            this.snackBar.open('Verificando Conta...', undefined, {
              duration: 2000,
            });

            this.authService.updateProfile();
            const userProfile = this.authService.userProfile.subscribe(
              (response) => {
                this.accountService.getUser(response.IdUsuario);
                userProfile.unsubscribe();
              }
            );
            const userDate = this.accountService.userDate.subscribe(
              (response) => {
                setTimeout(() => {
                  this.snackBar.open(
                    `Seja Bem-Vindo, ${
                      response.CadastroComum === undefined
                        ? 'Usuario'
                        : response.CadastroComum.Nome
                    }`,
                    undefined,
                    {
                      duration: 3000,
                    }
                  );
                  this.router.navigate(['web', 'main']);
                }, 2000);
                userDate.unsubscribe();
              }
            );
          }

          request.unsubscribe();
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Conta Incorreta', 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
  }
}

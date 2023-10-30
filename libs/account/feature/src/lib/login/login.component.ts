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
import { take, takeLast, takeWhile } from 'rxjs';

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
      this.authService.SingIn(this.account.value).subscribe((response) => {
        this.authStorage.setAcessToken(response.access_token);
        this.authService.nextProfile();
        this.authService.userProfile$.pipe(take(1)).subscribe((response) => {
          this.accountService.nextAccount(response.IdUsuario);
        });
        this.router.navigate(['web', 'main']);
      });
    }
  }
}

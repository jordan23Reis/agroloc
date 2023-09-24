import { AuthService, AuthStorage, Login } from '@agroloc/account/data-acess';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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
  authStorage = inject(AuthStorage);
  accountError = false;
  date: Login;

  account = this._formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  firstPassword = true;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  register() {
    this.router.navigate(['web', 'register']);
  }

  SingIn() {
    this.date = {
      email: this.account.value.email,
      password: this.account.value.password,
    };
    this.authService.SingIn(this.date);
    if (this.authStorage.getAcessToken()) {
      this.router.navigate(['web', 'home']);
    } else {
      this.accountError = true;
    }
  }

  invalidAccount(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.accountError) {
      return { required: true }; // Senha obrigatória
    } else {
      return null; // A validação passou
    }
  }

  getErrorMessage() {
    if (this.account.hasError('required')) {
      return 'You must enter a value';
    }
    return this.account.hasError('account') ? 'Not a valid email' : '';
  }
}

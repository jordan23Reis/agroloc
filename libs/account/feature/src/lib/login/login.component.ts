import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'libs/account/data-acess/src/lib/entities/login.interface';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService } from 'libs/account/data-acess/src/lib/service/auth.service';

@Component({
  selector: 'agroloc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  _formBuilder = inject(FormBuilder);
  breakpointObserver = inject(BreakpointObserver);
  http = inject(HttpClient);
  platform = inject(Platform);
  router = inject(Router);
  authService = inject(AuthService);

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
    const login = {
      email = this.account.get('email').value,
      password = this.account.get('password').value,
    };
    this.authService.SingIn(this.account.value);
    this.router.navigate(['web', 'home']);
  }
}

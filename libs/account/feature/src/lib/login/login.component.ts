import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  account = this._formBuilder.group({
    Email: ['', Validators.required, Validators.email],
    Senha: ['', Validators.required],
  });

  firstPassword = true;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  register() {
    this.router.navigate(['web', 'register']);
  }

  login() {
    this.http.post('/api/auth', this.account.value);
    this.router.navigate(['web', 'home']);
  }
}

import { Injectable, inject } from '@angular/core';
import { AuthStorage } from '../storage/auth.storage';
import { HttpClient } from '@angular/common/http';
import { Login } from '../entities/login.interface';
import { Token } from '../entities/token.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStorage = inject(AuthStorage);
  http = inject(HttpClient);
  router = inject(Router);
  SingIn(account: Login) {
    this.http.post<Token>('api/auth/login', account).subscribe((token) => {
      this.authStorage.setAcessToken(token.acess_token);
    });
  }
  SingOut() {
    this.authStorage.removeAcessToken();
    this.router.navigate([]);
  }
}

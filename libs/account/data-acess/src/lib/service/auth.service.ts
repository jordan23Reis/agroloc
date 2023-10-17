import { Injectable, inject } from '@angular/core';
import { AuthStorage } from '../storage/auth.storage';
import { HttpClient } from '@angular/common/http';
import { Login } from '../entities/login.interface';
import { Token } from '../entities/token.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../entities/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStorage = inject(AuthStorage);
  http = inject(HttpClient);
  router = inject(Router);

  userProfile = new BehaviorSubject<Profile | null>(null);
  userProfile$ = this.userProfile.asObservable();

  SingIn(account: Login) {
    this.http
      .post<Token>('/api/auth-user/login', account)
      .subscribe((token) => {
        this.authStorage.setAcessToken(token.access_token);
      });
  }

  SingOut() {
    this.authStorage.removeAcessToken();
    this.router.navigate([]);
  }

  IsLogged() {
    if (this.authStorage.getAcessToken()) {
      return true;
    }
    return false;
  }

  GetProfile() {
    this.http.get('/api/auth-user/payload').subscribe((profile: Profile) => {
      this.userProfile.next(profile);
    });
  }

  hasRequiredRoles(user: Profile, requiredRoles: string[]): boolean {
    if (!user || !user.TipoUsuario) {
      return false;
    }

    return requiredRoles.includes(user.TipoUsuario);
  }
}

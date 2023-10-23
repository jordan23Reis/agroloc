import { Injectable, inject } from '@angular/core';
import { AuthStorage } from '../storage/auth.storage';
import { HttpClient } from '@angular/common/http';
import { Login } from '../entities/login.interface';
import { Token } from '../entities/token.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, switchMap, take } from 'rxjs';
import { Profile } from '../entities/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStorage = inject(AuthStorage);
  http = inject(HttpClient);
  router = inject(Router);

  userProfile = new Subject<Profile>();

  SingIn(account: any) {
    return this.http.post<Token>('/api/auth-user/login', account);
  }

  SingOut() {
    this.authStorage.removeAcessToken();
    this.router.navigate([]);
  }

  IsLogged() {
    if (this.authStorage.getAcessToken()) {
      this.http
        .get('/api/auth-user/payload')
        .pipe(
          catchError((error) => {
            console.log('Error: ', error);
            throw new Error('Token Expirado.');
          })
        )
        .subscribe((response) => {
          return true;
        });
    }
    return false;
  }

  GetProfile() {
    this.http
      .get('/api/auth-user/payload')
      .pipe(
        take(1),
        catchError((error) => {
          console.log('Error: ', error);
          throw new Error(
            'Ocorreu um Erro ao tentar obter o Profile do Usuario.'
          );
        })
      )
      .subscribe((response) => {
        this.userProfile.next(response as Profile);
      });
  }

  hasRequiredRoles(user: Profile, requiredRoles: string[]): boolean {
    return requiredRoles.includes(user.TipoUsuario);
  }
}

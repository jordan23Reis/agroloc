import { Injectable, inject } from '@angular/core';
import { AuthStorage } from '../storage/auth.storage';
import { HttpClient } from '@angular/common/http';
import { Login } from '../entities/login.interface';
import { Token } from '../entities/token.interface';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { Profile } from '../entities/profile.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStorage = inject(AuthStorage);
  http = inject(HttpClient);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  userProfile = new ReplaySubject<Profile>();
  userProfile$ = this.userProfile.asObservable();

  nextProfile() {
    this.http
      .get('/api/auth-user/payload')
      .pipe(
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

  SingIn(account: any) {
    return this.http.post<Token>('/api/auth-user/login', account).pipe(
      catchError((error) => {
        this.snackBar.open('Conta Incorreta', 'Fechar', {
          duration: 3000,
        });
        throw new Error(error);
      })
    );
  }

  SingOutWeb() {
    this.authStorage.removeAcessToken();
    this.router.navigate(['web', 'main']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  SwtichAccountWeb() {
    this.authStorage.removeAcessToken();
    this.router.navigate(['web', 'login']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  IsLogged(): Observable<boolean> {
    const access_token = this.authStorage.getAcessToken();
    if (access_token) {
      return this.http.get<Profile>('/api/auth-user/payload').pipe(
        map((response) => (response.IdUsuario ? true : false)),
        catchError((error) => {
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }

  getProfile(): Observable<Profile> {
    return this.http.get('/api/auth-user/payload').pipe(
      map((response) => {
        return response as Profile;
      }),
      catchError((error) => {
        console.log('Error: ', error);
        throw new Error('Ocorreu um erro ao Verificar o Usuario.');
      })
    );
  }

  hasRequiredRoles(user: Profile, requiredRoles: string[]): boolean {
    return requiredRoles.includes(user.TipoUsuario);
  }
}

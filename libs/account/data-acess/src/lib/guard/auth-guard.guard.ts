import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, of, Observable } from 'rxjs';
import { AuthStorage } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private authStorage: AuthStorage) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.IsLogged().pipe(
      switchMap((isLogged) => {
        if (isLogged) {
          const requiredRoles = route.data['roles'] as string[];
          return this.authService.getProfile().pipe(
            switchMap((response) => {
              if (
                !requiredRoles ||
                this.authService.hasRequiredRoles(response, requiredRoles)
              ) {
                return of(true);
              } else {
                this.snackBar.open('Acesso não Autorizado', 'Fechar', {
                  duration: 3000,
                });
                return of(false);
              }
            })
          );
        } else {
          if(this.authStorage.getAcessToken()){
            this.snackBar.open('Conta expirada, Efetue o Login novamente', undefined, {
              duration: 3000,
            });
          } else {
             this.snackBar.open('Acesso não Autorizado', 'Fechar', {
            duration: 3000,
          });
          }
          return of(false);
        }
      })
    );
  }
}

// return combineLatest([
//   this.authService.IsLogged(),
//   this.authService.userProfile$,
// ]).pipe(
//   map(([isLogged, userProfile]) => {
//     const { roles } = route.data;
//     const hasRole = this.authService.hasRequiredRoles(userProfile, roles);
//     this.snackBar.open(userProfile.EmailUsuario, 'Fechar', {
//       duration: 3000,
//     });
//     return isLogged && hasRole;
//   })
// );

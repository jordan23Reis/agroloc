import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../service';
import { Profile } from '../entities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, take, switchMap, of, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private router: Router) {}

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
          this.snackBar.open('Acesso não Autorizado', 'Fechar', {
            duration: 3000,
          });
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

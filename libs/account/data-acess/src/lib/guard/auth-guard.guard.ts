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
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const valueLogged = this.authService.IsLogged();
    const isLogged = await lastValueFrom(valueLogged);

    if (isLogged) {
      const requiredRoles = route.data['roles'] as string[];

      const valueUser = this.authService.userProfile;
      const user = await lastValueFrom(valueUser);
      console.log(user);
      if (
        !requiredRoles ||
        this.authService.hasRequiredRoles(user as Profile, requiredRoles)
      ) {
        return true;
      }
    }

    console.log(isLogged);
    this.snackBar.open('Acesso não Autorizado', 'Fechar', {
      duration: 3000,
    });
    return false;
  }
}

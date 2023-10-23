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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private router: Router) {}
  user: Profile;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.IsLogged()) {
      const requiredRoles = route.data['roles'] as string[];

      this.authService.userProfile.subscribe((response) => {
        this.user = response as Profile;
      });

      if (
        !requiredRoles ||
        this.authService.hasRequiredRoles(this.user, requiredRoles)
      ) {
        return true;
      }
    }
    this.snackBar.open('Acesso não Autorizado', 'Fechar', {
      duration: 3000,
    });
    return false;
  }
}

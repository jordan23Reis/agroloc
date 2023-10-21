import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../service';
import { Profile } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.IsLogged()) {
      const requiredRoles = route.data['roles'] as string[];
      const user = (this.authService.userProfile.value as Profile) ?? null;

      if (
        !requiredRoles ||
        this.authService.hasRequiredRoles(user, requiredRoles)
      ) {
        return true;
      }
    }

    // this.router.navigate(['/login']);
    return false;
  }
}

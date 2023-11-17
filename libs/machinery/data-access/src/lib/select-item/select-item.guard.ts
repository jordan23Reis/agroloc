import { SearchService } from '@agroloc/shared/data-access';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class selectItemGuard implements CanActivate {
  constructor(private searchService: SearchService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.searchService.itemSelect$.pipe(
      take(1),
      switchMap((response) => {
        if (response) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}

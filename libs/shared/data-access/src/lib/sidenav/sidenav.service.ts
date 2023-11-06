import { Account } from '@agroloc/account/data-acess';
import { Injectable } from '@angular/core';
import { ReplaySubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  control = false;

  sidenav = new ReplaySubject<boolean>(1);
  sidenav$ = this.sidenav.asObservable();

  activeSidenav() {
    this.control = !this.control;
    this.sidenav.next(this.control);
  }
}

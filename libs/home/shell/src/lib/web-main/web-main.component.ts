import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  Account,
  AccountService,
  AuthService,
  Profile,
} from '@agroloc/account/data-acess';
import { Observable, Subject, map, of } from 'rxjs';

@Component({
  selector: 'agroloc-web-main',
  templateUrl: './web-main.component.html',
  styleUrls: ['./web-main.component.scss'],
})
export class WebMainComponent {
  router = inject(Router);
  location = inject(Location);
  platform = inject(Platform);
  authService = inject(AuthService);
  accountService = inject(AccountService);

  userDate = this.accountService.userAccount$.pipe(
    map((response) => {
      return response;
    })
  );

  isLogged = this.authService.IsLogged();
  notLogged = this.authService.IsLogged().pipe(
    map((response) => {
      return !response;
    })
  );

  currentUrl = this.location.path() ?? '';
  isMobile = this.platform.ANDROID || this.platform.IOS;
  showFiller = false;
  isDarkMode?: boolean;
  darkMode = false;
  value = '';
  activeLink = '';

  links = [
    { nome: 'Home', url: 'home' },
    { nome: 'Cadastrar', url: 'machinery' },
    { nome: 'Pesquisa', url: 'search' },
    { nome: 'Detalhes', url: 'details' },
  ];

  constructor() {
    this.isDarkMode =
      localStorage.getItem('prefers-color-scheme') === 'light' ? false : true;
    if (this.isDarkMode) {
      localStorage.setItem('prefers-color-scheme', 'dark');
      document.body.classList.add('darkMode');
    } else {
      localStorage.setItem('prefers-color-scheme', 'light');
      document.body.classList.remove('darkMode');
    }
  }

  moveUrl(event: MatTabChangeEvent) {
    const link = this.links[event.index];
    if (this.activeLink !== link.url) {
      this.activeLink = link.url;
      if (this.isMobile) {
        this.router.navigateByUrl(`mob/main/${link.url}`);
      } else {
        this.router.navigateByUrl(`web/main/${link.url}`);
      }
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.darkMode = this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('prefers-color-scheme', 'dark');
      document.body.classList.add('darkMode');
    } else {
      localStorage.setItem('prefers-color-scheme', 'light');
      document.body.classList.remove('darkMode');
    }
  }

  logout() {
    this.authService.SingOutWeb();
  }

  switchAccount() {
    this.authService.SwtichAccountWeb();
  }
}

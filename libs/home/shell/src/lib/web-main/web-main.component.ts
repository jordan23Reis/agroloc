import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AccountService, AuthService } from '@agroloc/account/data-acess';

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
  currentUrl = this.location.path() ?? '';

  isLogged = this.authService.IsLogged();
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
    { nome: 'Gerenciar Conta', url: 'management' },
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
    console.log(localStorage.getItem('prefers-color-scheme'));
    if (this.isDarkMode) {
      localStorage.setItem('prefers-color-scheme', 'dark');
      document.body.classList.add('darkMode');
    } else {
      localStorage.setItem('prefers-color-scheme', 'light');
      document.body.classList.remove('darkMode');
    }
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'agroloc-web-main',
  templateUrl: './web-main.component.html',
  styleUrls: ['./web-main.component.scss'],
})
export class WebMainComponent {
  router = inject(Router);
  location = inject(Location);
  platform = inject(Platform);
  currentUrl = this.location.path() ?? '';

  isMobile = this.platform.ANDROID || this.platform.IOS;
  showFiller = false;
  value = '';
  activeLink = '';

  links = [
    { nome: 'Home', url: 'home' },
    { nome: 'Cadastrar', url: 'machinery' },
    { nome: 'Pesquisa', url: 'search' },
    { nome: 'Detalhes', url: 'details' },
  ];

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
}

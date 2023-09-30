import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'agroloc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';
  platform = inject(Platform);
  router = inject(Router);
  location = inject(Location);
  isMobile = this.platform.ANDROID || this.platform.IOS;
  currentUrl = this.location.path() ?? '';
  filterUrl = this.prefixRemove(this.currentUrl);

  ngOnInit() {
    console.log(this.filterUrl);
    if (this.filterUrl !== '') {
      if (this.isMobile) {
        this.router.navigateByUrl(`/mob/${this.filterUrl}`);
      } else {
        this.router.navigateByUrl(`/web/${this.filterUrl}`);
      }
    } else {
      if (this.isMobile) {
        this.router.navigate(['mob']);
      } else {
        this.router.navigate(['web']);
      }
    }
  }

  prefixRemove(url: string): string {
    if (url.startsWith('/web')) {
      return url.substring(5);
    } else if (url.startsWith('/mob')) {
      return url.substring(5);
    } else if (url.startsWith('/')) {
      return url.substring(1);
    }
    return url;
  }
}

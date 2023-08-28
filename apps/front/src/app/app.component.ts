import { Component, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'agroloc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front';
  platform = inject(Platform);
  media = inject(MediaMatcher);
  router = inject(Router);
  mobileUser: boolean = this.platform.ANDROID || this.platform.IOS;
  #detect = new BehaviorSubject(false);
  detect$ = this.#detect.asObservable();
  mobileQuery: any;
  constructor() {
    const mobileQuery = this.media.matchMedia('(max-width: 600px)');
    mobileQuery.addEventListener('change', ({ matches }) => {
      this.#detect.next(matches);
    });
    if (this.mobileUser) {
      this.router.navigate(['', 'mob']);
    } else {
      this.router.navigate(['', 'web']);
    }
  }
}

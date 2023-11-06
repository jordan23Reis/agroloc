import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderFacade {
  active$ = new BehaviorSubject<boolean>(false);
  requestCount = 0;

  activate() {
    this.requestCount += 1;
    this.active$.next(true);
  }

  desactivate() {
    this.requestCount -= 1;
    if (!this.requestCount) {
      this.active$.next(false);
    }
  }

  intervalLoading() {
    this.requestCount += 1;
    this.active$.next(true);

    setTimeout(() => {
      this.requestCount -= 1;
      if (!this.requestCount) {
        this.active$.next(false);
      }
    }, 2000);
  }
}

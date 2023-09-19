import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderFacade {
  active$ = new BehaviorSubject<boolean>(false);

  activate() {
    this.active$.next(true);
  }

  desactivate() {
    this.active$.next(false);
  }
}

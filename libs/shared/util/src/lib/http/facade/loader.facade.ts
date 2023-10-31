import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderFacade {
  active$ = new BehaviorSubject<boolean>(false);

  activate() {
    console.log('ativado');
    this.active$.next(true);
  }

  desactivate() {
    console.log('desativado');
    this.active$.next(false);
  }
}

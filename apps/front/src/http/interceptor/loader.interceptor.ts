import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderFacade } from '../facade/loader.facade';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  loaderFacade = inject(LoaderFacade);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderFacade.activate();
    return next
      .handle(request)
      .pipe(finalize(() => this.loaderFacade.desactivate()));
  }
}

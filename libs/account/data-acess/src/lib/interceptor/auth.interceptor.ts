import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStorage } from '../storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authStorage = inject(AuthStorage);
  access_token = this.authStorage.getAcessToken();

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.access_token) {
      reportError({ message: 'Ocorreu um erro de autenticação' });
    }

    if (this.access_token && this.access_token.length) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.access_token}`
        ),
      });
    }

    return next.handle(request);
  }
}

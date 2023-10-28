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

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const access_token = this.authStorage.getAcessToken();

    if (access_token && access_token.length) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${access_token}`),
      });
    }
    return next.handle(request);
  }
}

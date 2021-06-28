import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Products } from '../db/products';

@Injectable()
export class AuthInjector implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers
      .set('Authentication', 'basic');
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}

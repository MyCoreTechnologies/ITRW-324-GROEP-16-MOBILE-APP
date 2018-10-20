import { SubmitService } from './app.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService {

  constructor(public submitService: SubmitService) {
  }

    // Interceptor waits for any HTTP post or get to the web service and uses the getToken method
    // from app.service.ts to insert the token in the header.
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    request = request.clone({

      // Inserting in header: Token
      setHeaders: {
      Authorization: `${this.submitService.getToken()}`
      }
    });
    // Forwarding request to web service.
    return next.handle(request);
    }
}
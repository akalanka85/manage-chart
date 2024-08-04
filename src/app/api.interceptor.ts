import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Continue with the next handler
    return next.handle(req).pipe(
      // Log the response details
      tap(event => {
        console.log('HTTP Response:', event);
      }),
      // Handle errors globally
      catchError((error: HttpErrorResponse) => {
        console.error('Error intercepted:', error);
        return throwError(error);
      })
    );
  }
}

import { Router } from '@angular/router';
import { AuthService } from './../services/api/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private _auth: AuthService, private router: Router) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // temporary
    // add withCredentials header to ALL requests (for now)
    request = request.clone( { withCredentials: true } );

    if (this._auth.accessToken) {
      request = this.addAuthToken(request, this._auth.accessToken);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('htterror is 401');
          return this.attemptRefreshToken(request, next);

        } else {
          this.router.navigate(['/login']);
          return throwError(error);
        }
      })
    );
  }

  private addAuthToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });
  }

  private attemptRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      console.log('we are refreshing, hold!!')

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return next.handle(request);
    } else {

      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addAuthToken(request, accessToken));
        })
      );

    }
  }
}

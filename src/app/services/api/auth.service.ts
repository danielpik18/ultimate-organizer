import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  // ------------------------------------------------------------------------------------------------
  // Access token
  private _accessToken: string;
  private _accessTokenExpiresIn: number;

  // ------------------------------------------------------------------------------------------------
  // Auth user
  private _authUser = new BehaviorSubject<any>(null);

  // ------------------------------------------------------------------------------------------------
  // Silent refresh
  private silentRefreshInterval;
  private accessTokenLifetime = 900; // seconds
  private timeBeforeRefresh = (this.accessTokenLifetime * 1000) - ((this.accessTokenLifetime * 1000) * 0.15);

  // ------------------------------------------------------------------------------------------------
  //  Getters
  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(val) {
    this._accessToken = val;
  }

  get accessTokenExpiresIn(): number {
    return this._accessTokenExpiresIn;
  }

  set accessTokenExpiresIn(val) {
    this._accessTokenExpiresIn = val;
  }

  get authUser(): Observable<any> {
    return this._authUser.asObservable();
  }


  //

  get loggedIn(): boolean {
    return this._accessToken ? true : false;
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    private _cookieService: CookieService
  ) {
    super();
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    })
      .pipe(
        shareReplay(),
        map((data: any) => {
          this._authUser.next(data.user);

          this.router.navigate(['/home']).then(result => {
            console.log('navdata: ', result, data);
          });

          this._accessToken = data.token.access_token;
          this._accessTokenExpiresIn = data.token.expires_in;

          this.setSilentRefresh();

          //
          this._cookieService.set('session_set', 'true', 1);

          return data;
        }),
        catchError(error => {
          console.log('Login error: ', error.error.message);
          return throwError(error);
        })
      );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      map(data => {
        this._accessToken = null;
        this._accessTokenExpiresIn = null;
        this._authUser.next(null);

        this._cookieService.delete('session_set');
        this.silentRefreshInterval = null;

        this.router.navigate(['/login']);

        return data;
      })
    );
  }

  setSilentRefresh() {
    this.silentRefreshInterval = setInterval(() => {
      this.refreshToken().subscribe(result => {
        if (result) {
          console.log('token refreshed!');
        } else {
          console.log('token NOT refreshed!');
        }
      });
    }, this.timeBeforeRefresh);
  }

  refreshToken(): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/refresh`, {}).pipe(
      map((data: any) => {
        if (data.token) {
          console.log('got data from canActivate: ', data);

          this._cookieService.set('session_set', 'true', 1);
          this._accessToken = data.token.access_token;

          if(!this.silentRefreshInterval) {
            this.setSilentRefresh();
          }

          return true
        }
      },
        catchError(err => {
          console.log('canactivate err:', err);
          this.router.navigate(['/login']);

          return of(false);
        })
      )
    );;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  test = 'test';

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.test === 'test') {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}

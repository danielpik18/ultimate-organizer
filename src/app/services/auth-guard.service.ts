import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  logged = false;

  set loggedIn(val: boolean){
    this.logged = val;
  }

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (!this.logged) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}

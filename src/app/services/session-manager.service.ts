import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  get loggedIn() {
    return false;
  }

  constructor() { }
}

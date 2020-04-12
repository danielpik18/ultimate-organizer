import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../../services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //@Output() onLogin: EventEmitter<any> = new EventEmitter();

  email: string;
  password: string;

  authUsr;

  constructor(
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this._auth.authUser.subscribe(authUser => {
      this.authUsr = authUser;
    });
  }

  login() {
    this._auth.login(this.email, this.password).subscribe(data => {
      if (data) {
        console.log('Data: ', data);
      }
    });
  }

}

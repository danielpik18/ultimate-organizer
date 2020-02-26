import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //@Output() onLogin: EventEmitter<any> = new EventEmitter();

  constructor(
    private authGuard: AuthGuardService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.authGuard.loggedIn = true;
    this.router.navigate(['/']);
  }

}

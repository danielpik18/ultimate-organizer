import { Router } from '@angular/router';
import { AuthService } from './../../services/api/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._auth.logout().subscribe(data => {
      console.log('from logout: ', data, this._auth.accessToken, this._auth.accessTokenExpiresIn);
    });
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() onLogin: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

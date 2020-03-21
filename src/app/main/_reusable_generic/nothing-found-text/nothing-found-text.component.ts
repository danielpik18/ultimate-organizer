import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nothing-found-text',
  templateUrl: './nothing-found-text.component.html',
  styleUrls: ['./nothing-found-text.component.scss']
})
export class NothingFoundTextComponent implements OnInit {
  @Input() text: string;
  @Input() fontSize: string;

  constructor() { }

  ngOnInit(): void {
  }

}

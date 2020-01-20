import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}

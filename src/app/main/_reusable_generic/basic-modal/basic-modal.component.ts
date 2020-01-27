import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export class BasicModalComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  @Input() modalWidth: string;
  @Input() modalHeight: string;
  @Output() onBackdropClick: EventEmitter<any> = new EventEmitter();

  @Input() elementToBlur: Element;

  constructor() { }

  ngOnInit() {
    this.elementToBlur.classList.remove('unblurElement');
    this.elementToBlur.classList.add('blurElement');
  }

  ngOnDestroy() {
    this.elementToBlur.classList.remove('blurElement');
    this.elementToBlur.classList.add('unblurElement');
  }

}

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

  constructor() { }

  ngOnInit() {
    this.wrapper.nativeElement.parentElement.parentElement.firstChild.classList.remove('unblurElement');
    this.wrapper.nativeElement.parentElement.parentElement.firstChild.classList.add('blurElement');
  }

  ngOnDestroy(){
    this.wrapper.nativeElement.parentElement.parentElement.firstChild.classList.remove('blurElement');
    this.wrapper.nativeElement.parentElement.parentElement.firstChild.classList.add('unblurElement');
  }

}

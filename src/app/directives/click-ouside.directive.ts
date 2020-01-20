import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOusideDirective {
  @Output() clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);

    if (!clickedInside && !targetElement.classList.contains('cdk-drag-handle')) {
      this.clickOutside.emit();
    }

  }

  constructor(private _elementRef: ElementRef) { }

}

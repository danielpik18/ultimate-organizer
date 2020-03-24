import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-filter-data-button',
  templateUrl: './filter-data-button.component.html',
  styleUrls: ['./filter-data-button.component.scss']
})
export class FilterDataButtonComponent implements OnInit {
  @ViewChild('filterPopover', { static: true }) filterPopover: ElementRef;
  @ViewChild('filterOptionsWrapper') filterOptionsWrapper: ElementRef;

  @Input() filterOptions: string[];
  @Input() defaultFilter: string;
  @Input() orientation: string = 'DESC';

  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();
  @Output() onOrientationChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleOrientation() {
    if (this.orientation === 'DESC') {
      this.orientation = 'ASC';
    } else {
      this.orientation = 'DESC';
    }

    this.onOrientationChange.emit(this.orientation);
  }

  togglePopover(justClose = false) {
    if (!justClose) {
      this.filterPopover.nativeElement.classList.toggle('filterPopover--show');
    } else if (this.filterPopover.nativeElement.classList.contains('filterPopover--show')) {
      this.filterPopover.nativeElement.classList.toggle('filterPopover--show');
    }
  }

  selectFilter(filterID: string) {
    for (let index = 0; index < this.filterOptionsWrapper.nativeElement.childElementCount; index++) {
      const currentInputElement = this.filterOptionsWrapper.nativeElement.children[index].children[0];

      if (currentInputElement.id === filterID) {
        currentInputElement.checked = true;
      }
    }

    this.onFilterChange.emit(filterID);
  }

}

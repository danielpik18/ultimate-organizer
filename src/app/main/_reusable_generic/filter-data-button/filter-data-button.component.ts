import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-filter-data-button',
  templateUrl: './filter-data-button.component.html',
  styleUrls: ['./filter-data-button.component.scss']
})
export class FilterDataButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('filterPopover', { static: true }) filterPopover: ElementRef;
  @ViewChild('filterOptionsWrapper', { static: false }) filterOptionsWrapper: ElementRef;
  @Input() filterOptions: string[];
  @Input() defaultFilter: string;
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    for (let index = 0; index < this.filterOptionsWrapper.nativeElement.childElementCount; index++) {
      const currentInputElement = this.filterOptionsWrapper.nativeElement.children[index].children[0];

      if (currentInputElement.id === this.defaultFilter) {
        currentInputElement.checked = true;
      }
    }
  }

  onFilterSelected() {
    this.onFilterChange.emit('holahola');
  }

  togglePopover(justClose = false) {
    if (!justClose) {
      this.filterPopover.nativeElement.classList.toggle('filterPopover--show');
    } else if (this.filterPopover.nativeElement.classList.contains('filterPopover--show')) {
      this.filterPopover.nativeElement.classList.toggle('filterPopover--show');
    }
  }

}

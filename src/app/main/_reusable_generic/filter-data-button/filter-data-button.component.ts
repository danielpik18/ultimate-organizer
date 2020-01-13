import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-filter-data-button',
  templateUrl: './filter-data-button.component.html',
  styleUrls: ['./filter-data-button.component.scss']
})
export class FilterDataButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('filterPopover', { static: true }) filterPopover: ElementRef;
  @ViewChild('filterOptionsWrapper', { static: false }) filterOptionsWrapper: ElementRef;
  @Input('filterOptions') filterOptions: string[];
  @Input('defaultFilter') defaultFilter: string;
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    for(let index = 0; index < this.filterOptionsWrapper.nativeElement.childElementCount; index++){
      let currentInputElement = this.filterOptionsWrapper.nativeElement.children[index].children[0];

      if(currentInputElement.id === this.defaultFilter){
        currentInputElement.checked = true;
      }
    }
  }

  testo(){
    this.onFilterChange.emit('heyoooo');
  }

  togglePopover(){
    this.filterPopover.nativeElement.classList.toggle('filterPopover--show');
  }

}

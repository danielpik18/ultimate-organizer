import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @ViewChild('text_input') text_input: ElementRef;

  //Style inputs
  @Input() display: string;
  @Input() width: string = '100%';
  @Input() color: string;
  @Input() fontWeight: string = '500';
  @Input() fontSize: string = '.9rem';
  @Input() inputBackground;

  @Input() text: string = '';
  @Input() placeholder: string = '';
  @Input() editing: BehaviorSubject<any> = new BehaviorSubject(false);

  @Output() onTextChange: EventEmitter<any> = new EventEmitter();

  //

  constructor(public _colorPalette: ColorPaletteService) { }

  ngOnInit() {
    this.editing.subscribe(isBeingEdited => {
      if (isBeingEdited) {
        //  setTimeout workaround
        setTimeout(() => {
          this.text_input.nativeElement.focus();
        }, 0);
      }
    })
  }

  returnInputValue() {
    this.onTextChange.emit(this.text_input.nativeElement.value);
  }

}

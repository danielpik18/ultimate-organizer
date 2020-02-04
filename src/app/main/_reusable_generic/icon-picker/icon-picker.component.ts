import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IconsService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {
  @Input() iconsColor: string;

  @Output() onIconClick: EventEmitter<any> = new EventEmitter();
  @Output() onColorChange: EventEmitter<any> = new EventEmitter();

  faSolid: string[];

  constructor(private _iconsService: IconsService) { }

  ngOnInit() {
    this.faSolid = this._iconsService.fontAwesomeSolidIconClasses;
  }

  changeColor(color: string){
    this.iconsColor = color;
    this.onColorChange.emit(color);
  }
}

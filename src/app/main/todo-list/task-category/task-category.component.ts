import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss']
})
export class TaskCategoryComponent implements OnInit {
  @Input() categoryName: string;
  @Input() categoryFaIconClass: string;
  @Input() categoryColorName: string;

  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(false);
  editMode: boolean = false;

  constructor(private _colorPalette: ColorPaletteService) { }

  ngOnInit() {
    this.editModeSubject.subscribe(mode => this.editMode = mode);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss']
})
export class TaskCategoryComponent implements OnInit {
  @Input() categoryID: string;
  @Input() categoryName: string;
  @Input() categoryFaIconClass: string;
  @Input() categoryColorName: string;

  @Output() onRemoveCategoryButtonClick: EventEmitter<any> = new EventEmitter();

  //  Edit mode
  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(false);
  editMode = false;
  tasksWrapperElement: Element;

  constructor(
    private _colorPalette: ColorPaletteService
  ) { }

  ngOnInit() {
    this.editModeSubject.subscribe(mode => this.editMode = mode);
  }



}

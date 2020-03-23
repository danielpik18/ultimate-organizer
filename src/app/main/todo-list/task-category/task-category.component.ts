import { TaskCategoriesApiService } from './../../../services/api/task-categories-api.service';
import { TaskCategory } from './../../../models/task-category';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss']
})
export class TaskCategoryComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() name: string;
  @Input() iconClass: string;
  @Input() colorHex: string;

  @Input() selected: boolean;

  @Output() onRemoveCategoryButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateTaskCategory: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild('categoryIcon', { static: true }) categoryIcon: ElementRef;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  // the category itself
  taskCategory: TaskCategory;

  // temp
  _tempTaskCategoryValues: TaskCategory;

  //   helpers / getarounds
  _clickAwayEnabled = false;

  //  Edit mode
  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(false);
  editMode = false;

  constructor(
    private _taskCategoriesApi: TaskCategoriesApiService,
    public _colorPalette: ColorPaletteService
  ) { }

  ngOnInit() {
    this.editModeSubject.subscribe(mode => this.editMode = mode);

    //  Instantiate task category

    this.taskCategory = {
      id: this.id,
      name: this.name,
      color: this.colorHex,
      icon_class: this.iconClass
    };
  }

  ngOnChanges() {
    //console.log(`ID: ${this.id}, Selected: ${this.selected}`);

    this.applySelectedStyles();
  }

  applySelectedStyles() {
    if (this.selected && !this.wrapper.nativeElement.classList.contains('activeCategory')) {
      this.wrapper.nativeElement.classList.add('activeCategory');

    } else if (this.wrapper.nativeElement.classList.contains('activeCategory')) {
      this.wrapper.nativeElement.classList.remove('activeCategory')
    }
  }

  changeIcon(iconClassNames: string) {
    this.taskCategory.icon_class = iconClassNames;

    console.log("Changing icon to: ", iconClassNames);
  }

  changeIconColor(color: string) {
    this.taskCategory.color = color;
  }

  turnOnEditMode() {
    console.log('Turning edit mode ON', this.taskCategory.name);

    if (!this.editMode) {
      //  Temporarily saving the task values before turning edit mode ON
      this._tempTaskCategoryValues = {
        name: this.taskCategory.name.trim(),
        color: this.taskCategory.color,
        icon_class: this.taskCategory.icon_class
      };

      this.editModeSubject.next(true);
      this.applySelectedStyles();
      this._clickAwayEnabled = false;
    }
  }

  turnOffEditMode() {
    if (this.editMode) {
      //  make an object with the possibly updated values
      const updatedTaskCategory: TaskCategory = {
        name: this.taskCategory.name.trim(),
        color: this.taskCategory.color,
        icon_class: this.taskCategory.icon_class
      };

      if (JSON.stringify(this._tempTaskCategoryValues) !== JSON.stringify(updatedTaskCategory)) {
        this.updateCategory(updatedTaskCategory);

        console.log('values differ, updating...');
      }

      this.editModeSubject.next(false);
      this.applySelectedStyles();
    }
  }


  updateCategory(taskCategory: TaskCategory) {
    if (taskCategory.name) {
      console.log("Task category to update: ", taskCategory);

      this._taskCategoriesApi.updateTaskCategory(this.taskCategory.id, taskCategory).subscribe(data => {
        if (data) {
          this.onUpdateTaskCategory.emit(data);
        }
      });
    } else {
      this.onUpdateTaskCategory.emit();
      this.taskCategory.name = this._tempTaskCategoryValues.name;
      alert("The name cannont be empty")
    }
  }

}

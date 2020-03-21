import { TaskCategory } from './../../../models/task-category';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { BehaviorSubject } from 'rxjs';
import { TaskCategoriesApiService } from 'src/app/services/api/task-categories-api.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss', './../task-category/task-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  @Output() onTaskCategoryCreated: EventEmitter<any> = new EventEmitter();

  @ViewChild('categoryIcon', { static: true }) categoryIcon: ElementRef;

  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(true);
  _clickAwayOmittedFirst = false;

  categoryTitle: string = "";
  categoryColor: string = this._colorPalette.getColorHex('blue');

  constructor(
    public _colorPalette: ColorPaletteService,
    private _taskCategoriesApi: TaskCategoriesApiService
  ) { }

  ngOnInit() {
  }

  changeIcon(iconClassNames: string) {
    this.categoryIcon.nativeElement.classList.remove(this.categoryIcon.nativeElement.classList.item(3));

    iconClassNames.split(" ").forEach(className => {
      this.categoryIcon.nativeElement.classList.add(className);
    });
  }

  changeIconColor(color: string) {
    this.categoryColor = color;
  }

  saveCategory() {
    if (this.categoryTitle) {
      const taskCategory: TaskCategory = {
        name: this.categoryTitle,
        color: this.categoryColor,
        icon_class: `${this.categoryIcon.nativeElement.classList[2]} ${this.categoryIcon.nativeElement.classList[3]}`
      };

      this._taskCategoriesApi.createTaskCategory(taskCategory).subscribe(data => {
        if (data) {
          this.onTaskCategoryCreated.emit(data);

        } else {
          console.log("Task not created, something went wrong.");
        }
      });
    }
  }
}

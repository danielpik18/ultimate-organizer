import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('categoryIcon', { static: true }) categoryIcon: ElementRef;

  //  Edit mode
  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(false);
  editMode = false;
  tasksWrapperElement: Element;

  constructor(
    public _colorPalette: ColorPaletteService
  ) { }

  ngOnInit() {
    this.editModeSubject.subscribe(mode => this.editMode = mode);
  }

  changeIcon(iconClassNames: string) {
    this.categoryIcon.nativeElement.classList.remove(this.categoryIcon.nativeElement.classList.item(3));

    iconClassNames.split(" ").forEach(className => {
      this.categoryIcon.nativeElement.classList.add(className);
    });
  }

  changeIconColor(color: string) {
    this.categoryIcon.nativeElement.style.color = color;
  }
}

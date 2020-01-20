import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss']
})
export class TodoCategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild('taskCategoriesList', { static: true }) taskCategoriesList: ElementRef;

  categories: any = [
    {
      name: 'Fitness',
      faIconClass: 'fas fa-dumbbell',
      colorHex: 'blue'
    },
    {
      name: 'Health',
      faIconClass: 'fas fa-heartbeat',
      colorHex: 'red'
    },
    {
      name: 'Work',
      faIconClass: 'fas fa-briefcase',
      colorHex: 'green'
    }
  ];

  constructor(private _colorPaletteService: ColorPaletteService) { }

  getColorHex(colorName: string) {
    return this._colorPaletteService.getColorHex(colorName);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  pushNewCategory() {
    this.categories.push({
      name: 'Test',
      faIconClass: 'fas fa-dumbbell',
      colorHex: 'red_dark'
    });

    console.log(this.taskCategoriesList.nativeElement.scrollHeight, this.taskCategoriesList.nativeElement.clientHeight)
  }

}

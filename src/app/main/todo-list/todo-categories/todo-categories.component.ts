import { Component, OnInit } from '@angular/core';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss']
})
export class TodoCategoriesComponent implements OnInit {
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
    },
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
    },
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
      colorHex: 'green_light'
    }
  ];

  constructor(private _colorPaletteService: ColorPaletteService) { }

  getColorHex(colorName: string){
    return this._colorPaletteService.getColorHex(colorName);
  }

  ngOnInit() {
  }

}

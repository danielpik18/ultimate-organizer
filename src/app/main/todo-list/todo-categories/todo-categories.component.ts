import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss']
})
export class TodoCategoriesComponent implements OnInit {
  @ViewChild('taskCategoriesList', { static: true }) taskCategoriesList: ElementRef;

  categories: any = [
    {
      name: 'Fitness',
      faIconClass: 'fas fa-dumbbell',
      color: 'blue'
    },
    {
      name: 'Health',
      faIconClass: 'fas fa-heartbeat',
      color: 'red'
    },
    {
      name: 'Work',
      faIconClass: 'fas fa-briefcase',
      color: 'green'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  pushNewCategory() {
    this.categories.push({
      name: 'Test',
      faIconClass: 'fas fa-dumbbell',
      colorHex: 'red_dark'
    });
  }

}

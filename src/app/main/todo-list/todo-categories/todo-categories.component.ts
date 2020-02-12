import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss']
})
export class TodoCategoriesComponent implements OnInit {
  @ViewChild('taskCategoriesList', { static: true }) taskCategoriesList: ElementRef;

  //  Creating category
  creatingCategory = false;

  //  Modals
  showRemoveModal = false;

  categories: any = [
    {
      id: 'A01',
      name: 'Fitness',
      faIconClass: 'fas fa-dumbbell',
      color: 'blue'
    },
    {
      id: 'A03',
      name: 'Work',
      faIconClass: 'fas fa-briefcase',
      color: 'green'
    },
    {
      id: 'A02',
      name: 'Health',
      faIconClass: 'fas fa-heartbeat',
      color: 'red'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleCreatingCategory() {
    this.creatingCategory = !this.creatingCategory;
  }

  toggleRemoveModal(id: string = null){
    if(id){
      console.log('Deleting category with ID: ', id);
    }
    this.showRemoveModal = !this.showRemoveModal;
  }

  saveCategory(categoryData: string){
    console.log('saving category with title: ', categoryData);
  }

}

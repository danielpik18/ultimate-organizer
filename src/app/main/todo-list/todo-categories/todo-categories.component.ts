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
  tasksWrapperElement: Element;
  showRemoveModal = false;

  categories: any = [
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
    },
    {
      id: 'A01',
      name: 'Fitness',
      faIconClass: 'fas fa-dumbbell',
      color: 'blue'
    }
  ];

  constructor(
    private _elementRef: ElementRef,
    private _helperFunctinos: HelperFunctionsService
  ) { }

  ngOnInit() {
    this.tasksWrapperElement = this._helperFunctinos.findParentElementByClass(this._elementRef.nativeElement, 'tasksWrapper');
  }

  pushNewCategory() {
    this.creatingCategory = !this.creatingCategory;
  }

  toggleRemoveModal(id: string){
    console.log('Deleting category with ID: ', id);
    this.showRemoveModal = !this.showRemoveModal;
  }

}

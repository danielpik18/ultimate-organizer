import { TaskCategoriesApiService } from './../../../services/api/task-categories-api.service';
import { TaskCategory } from './../../../models/task-category';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

    //  temp variables
    _categoryToBeDeleted = '';

    // helpers / getarounds
    _newCategoryClickAwayEnabled = false;

  categories: TaskCategory[];

  constructor(
    private _taskCategoriesApiService: TaskCategoriesApiService
  ) { }

  ngOnInit() {
    this.getTaskCategories();
  }

  //  api functions

  getTaskCategories() {
    this.categories = null;
    this._taskCategoriesApiService.getTaskCategories().subscribe(res => this.categories = [...res.data]);
  }

  deleteCategory() {
    if (this._categoryToBeDeleted) {
      this._taskCategoriesApiService.deleteTaskCategory(this._categoryToBeDeleted).subscribe(data => {
        if (data) {
          //  success
          this.toggleRemoveModal();
          this.getTaskCategories();
        } else {
          alert('something went wrong');
        }
      });
    }
  }

  //

  toggleCreatingCategory() {
    if(this.creatingCategory){
      this.creatingCategory = false;
    } else {
      this.creatingCategory = true;
    }
  }

  toggleRemoveModal(id: string = null) {
    if (id) {
      console.log('Category ID received: ', id)
      this._categoryToBeDeleted = id;
    }

    this.showRemoveModal = !this.showRemoveModal;
  }

  onCategoryCreated(taskCategory: TaskCategory){
    this.creatingCategory = false;
    this.getTaskCategories();
    console.log("Category created: ", taskCategory);
  }

  onCategoryUpdated(event: any) {
    if(event){
      const updatedTaskCategroy: TaskCategory = event.data;
      console.log('updated task category: ', updatedTaskCategroy);

      /*
      this._notificationsManager.pushNotification(
        'Tasks',
        updatedTaskCategroy.title,
        this._helperFunctions.getCurrentTimeIn12HourFormat(),
        this._colorPalette.getColorHex('red_light')
      );
      */
    }
  }

  onNewCategoryClickAway(){
    if(!this._newCategoryClickAwayEnabled){

    }
  }

}

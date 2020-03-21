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

  onCategoryCreated(taskCategory: TaskCategory){
    this.creatingCategory = false;
    this.getTaskCategories();
    console.log("Category created: ", taskCategory);
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
    this.creatingCategory = !this.creatingCategory;
  }

  toggleRemoveModal(id: string = null) {
    if (id) {
      console.log('Category ID received: ', id)
      this._categoryToBeDeleted = id;
    }

    this.showRemoveModal = !this.showRemoveModal;
  }

}

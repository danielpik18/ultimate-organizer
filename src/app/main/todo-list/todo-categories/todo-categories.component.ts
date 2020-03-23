import { TaskCategoriesApiService } from './../../../services/api/task-categories-api.service';
import { TaskCategory } from './../../../models/task-category';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss']
})
export class TodoCategoriesComponent implements OnInit {
  @Output() onCategorySelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('taskCategoriesList', { static: true }) taskCategoriesList: ElementRef;

  //  Modals stuff
  showRemoveModal = false;

  //  temp variables
  _categoryToBeDeleted = '';
  _selectedCategory = '';

  // helpers / getarounds
  _creatingCategory = false;


  //  The actual categories
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
    this._taskCategoriesApiService.getTaskCategories().subscribe(res => {
      this.categories = [...res.data];

      // Select first returned category, if there isn't any selected
      if(!this._selectedCategory){
        this.selectCategory(res.data[0].id);
      }
    });
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
    if(this._creatingCategory){
      this._creatingCategory = false;
    } else {
      this._creatingCategory = true;
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
    this._creatingCategory = false;
    this.getTaskCategories();
    console.log("Category created: ", taskCategory);
  }

  onCategoryUpdated(event: any) {
    if(event){
      const updatedTaskCategroy: TaskCategory = event.data;
      console.log('updated task category: ', updatedTaskCategroy);
    }
  }



  //

  selectCategory(id: string){
    if(id !== this._selectedCategory){
      this._selectedCategory = id;
      this.onCategorySelected.emit(id);
    }
  }

}

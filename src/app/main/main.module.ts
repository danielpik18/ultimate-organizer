import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { DraggableWindowComponent } from './draggable-window/draggable-window.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './login/login.component';
import { TodoCategoriesComponent } from './todo-list/todo-categories/todo-categories.component';
import { TodoComponent } from './todo-list/todo/todo.component';
import { LoadingWheelComponent } from './_reusable_generic/loading-wheel/loading-wheel.component';
import { FilterDataButtonComponent } from './_reusable_generic/filter-data-button/filter-data-button.component';
import { ClickOusideDirective } from '../directives/click-ouside.directive';
import { BasicModalComponent } from './_reusable_generic/basic-modal/basic-modal.component';
import { ConfirmationModalComponent } from './_reusable_generic/modals/confirmation-modal/confirmation-modal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateTodoComponent } from './todo-list/create-todo/create-todo.component';
import { EditableTextComponent } from './_reusable_generic/editable-text/editable-text.component';
import { TaskCategoryComponent } from './todo-list/task-category/task-category.component';
import { IconPickerComponent } from './_reusable_generic/icon-picker/icon-picker.component';
import { ClickPreventerComponent } from './_reusable_generic/click-preventer/click-preventer.component';


@NgModule({
  declarations: [
    HomeComponent,
    FloatingMenuComponent,
    DraggableWindowComponent,
    TodoListComponent,
    LoginComponent,
    TodoCategoriesComponent,
    TodoComponent,
    LoadingWheelComponent,
    FilterDataButtonComponent,
    ClickOusideDirective,
    BasicModalComponent,
    ConfirmationModalComponent,
    NotificationsComponent,
    CreateTodoComponent,
    EditableTextComponent,
    TaskCategoryComponent,
    IconPickerComponent,
    ClickPreventerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }

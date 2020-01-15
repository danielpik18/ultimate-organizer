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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClickOusideDirective } from '../directives/click-ouside.directive';


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
    ClickOusideDirective
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatTooltipModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }

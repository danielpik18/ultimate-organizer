import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { DraggableWindowComponent } from './draggable-window/draggable-window.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [HomeComponent, FloatingMenuComponent, DraggableWindowComponent, TodoListComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }

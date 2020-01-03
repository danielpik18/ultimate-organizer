import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { DraggableWindowComponent } from './draggable-window/draggable-window.component';
import { AngularDraggableModule } from 'angular2-draggable';



@NgModule({
  declarations: [HomeComponent, FloatingMenuComponent, DraggableWindowComponent],
  imports: [
    CommonModule,
    AngularDraggableModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }

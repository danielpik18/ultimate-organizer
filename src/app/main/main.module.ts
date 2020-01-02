import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';



@NgModule({
  declarations: [HomeComponent, FloatingMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }

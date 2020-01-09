import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpManagerService } from 'src/app/services/http-manager.service';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: any[];

  constructor(private httpManager: HttpManagerService, private windowManager: WindowsManagerService) { }

  ngOnInit() {

    this.windowManager.getWindows().subscribe(windows => {
      if (windows.includes('todos') && !this.todos) {
        this.httpManager.getTodos().subscribe(data => this.todos = data);
        console.log('fetching data');
      }
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}

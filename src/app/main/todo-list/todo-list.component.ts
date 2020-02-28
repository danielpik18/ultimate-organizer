import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpManagerService } from 'src/app/services/http-manager.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChild('todoList', { static: true }) todoList: ElementRef;
  @ViewChild('tasksWrapper', { static: true }) tasksWrapper: ElementRef;

  showDeleteModal = false;
  showDiscardNewTaskModal = false;
  creatingTaskMode = false;

  //
  enableNewTaskClickAway = true;

  todos: any[];

  constructor(private httpManager: HttpManagerService) { }

  ngOnInit() {
    this.httpManager.getTodos().subscribe(res => this.todos = [...res.data]);
  }

  filterData(filter: string) {
    console.log('test', filter);
  }

  toggleDeleteModal(taskId: string = null) {
    if (taskId) {
      console.log(taskId);
    }
    this.showDeleteModal = !this.showDeleteModal;
  }

  toggleDiscardNewTaskModal() {
    this.showDiscardNewTaskModal = !this.showDiscardNewTaskModal;

    setTimeout(() => {
      this.enableNewTaskClickAway = !this.enableNewTaskClickAway;
    }, 400);

  }

  toggleCreatingTaskMode(mode: string) {
    switch (mode) {
      case 'on':
        if (!this.creatingTaskMode) {
          this.creatingTaskMode = true;

          setTimeout(() => {
            this.tasksWrapper.nativeElement.scrollTop = 0;
          }, 0);
        }
        break;
      case 'off':
        if (this.creatingTaskMode) {
          this.creatingTaskMode = false;
        }
        break;
    }
  }

}

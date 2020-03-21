import { ColorPaletteService } from './../../services/color-palette.service';
import { NotificationsManagerService } from './../../services/notifications-manager.service';
import { Task } from './../../models/task';
import { TasksApiService } from './../../services/api/tasks-api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';

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

  //  temp variables
  _taskToBeDeleted = '';

  //

  tasks: any[];

  constructor(
    private _tasksApiService: TasksApiService,
    private _notificationsManager: NotificationsManagerService,
    private _helperFunctions: HelperFunctionsService,
    private _colorPalette: ColorPaletteService
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  //  api functions

  getTasks() {
    this.tasks = null;
    this._tasksApiService.getTasks().subscribe(res => this.tasks = [...res.data]);
  }

  deleteTask() {
    if (this._taskToBeDeleted) {
      this._tasksApiService.deleteTask(this._taskToBeDeleted).subscribe(data => {
        if (data) {
          //  success
          this.toggleDeleteModal();
          this.getTasks();
        } else {
          alert('something went wrong');
        }
      });
    }
  }

  //

  onTaskCreated() {
    this.creatingTaskMode = false;
    this.getTasks();
  }

  onTaskUpdated(event: any) {
    const updatedTask: Task = event.data;
    console.log('updated task: ', updatedTask);

    this._notificationsManager.pushNotification(
      'Tasks',
      updatedTask.title,
      this._helperFunctions.getCurrentTimeIn12HourFormat(),
      this._colorPalette.getColorHex('red_light')
    );
  }

  //
  //

  filterData(filter: string) {
    console.log('test', filter);
  }

  toggleDeleteModal(taskId: string = null) {
    if (taskId) {
      this._taskToBeDeleted = taskId;
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

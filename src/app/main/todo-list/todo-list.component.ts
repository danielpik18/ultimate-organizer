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
  @ViewChild('tasksWrapper', { static: true }) tasksWrapper: ElementRef;

  // modals
  showDeleteModal = false;
  showDiscardNewTaskModal = false;

  // helpers / getarounds
  _creatingTaskMode = false;
  _newTaskClickAwayEnabled = true;

  //  temp variables
  _taskToBeDeleted = '';

  //

  selectedTaskCategory = '';
  selectedFilter = 'completed';
  tasks: Task[];

  constructor(
    private _tasksApiService: TasksApiService,
    private _notificationsManager: NotificationsManagerService,
    private _helperFunctions: HelperFunctionsService,
    private _colorPalette: ColorPaletteService
  ) { }

  ngOnInit() {
  }

  //  api functions

  getTasks() {
    this.tasks = null;
    this._tasksApiService.getTasks(this.selectedFilter, this.selectedTaskCategory).subscribe(res => this.tasks = [...res.data]);
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

  // Output catchers

  onTaskCreated() {
    this._creatingTaskMode = false;
    this.getTasks();
  }

  onTaskUpdated(event: any) {
    if(event){
      const updatedTask: Task = event.data;
      console.log('updated task: ', updatedTask);

      this._notificationsManager.pushNotification(
        'Tasks',
        updatedTask.title,
        this._helperFunctions.getCurrentTimeIn12HourFormat(),
        this._colorPalette.getColorHex('red_light')
      );
    }
  }

  onTaskCategorySelected(task_category_id: string){
    this.selectedTaskCategory = task_category_id;
    this.getTasks();
  }

  //
  //

  filterData(filter: string) {
    console.log('Selected filter: ', filter);
    this.selectedFilter = filter;
    this.getTasks();
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
      this._newTaskClickAwayEnabled = !this._newTaskClickAwayEnabled;
    }, 400);

  }

  toggleCreatingTaskMode(mode: string) {
    switch (mode) {
      case 'on':
        if (!this._creatingTaskMode) {
          this._creatingTaskMode = true;

          setTimeout(() => {
            this.tasksWrapper.nativeElement.scrollTop = 0;
          }, 0);
        }
        break;
      case 'off':
        if (this._creatingTaskMode) {
          this._creatingTaskMode = false;
        }
        break;
    }
  }

}

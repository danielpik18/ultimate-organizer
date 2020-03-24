import { TasksApiService } from './../../../services/api/tasks-api.service';
import { Task } from './../../../models/task';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, AfterViewInit {

  //  Inputs for each task property
  @Input() id: string;
  @Input() categoryId: string;
  @Input() title: string;
  @Input() date: string;
  @Input() priority: string;
  @Input() isTaskCompleted: number;

  //

  @Output() onRemoveTaskButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<any> = new EventEmitter();

  //

  @ViewChild('todoWrapper', { static: true }) todoWrapper: ElementRef;
  @ViewChild('priorityIcon') priorityIcon: ElementRef;
  @ViewChild('priorityText') priorityText: ElementRef;
  @ViewChild('completeTaskButtonCheckmark', { static: true }) completeTaskButtonCheckmark: ElementRef;
  @ViewChild('completeTaskButton', { static: true }) completeTaskButton: ElementRef;
  @ViewChild('removeTaskButton') removeTaskButton: ElementRef;

  //  Elements for editing task
  @ViewChild('input_title') input_title: ElementRef;
  @ViewChild('input_date') input_date: ElementRef;

  //  The task itself
  task: Task;
  //

  //  Edit mode
  editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode = false;

  //
  _tempTaskValues: Task;

  constructor(
    private _tasksApiService: TasksApiService
  ) { }

  ngOnInit() {
    this.editModeSubject.subscribe(mode => {
      this.editMode = mode;
    });

    //  Instantiate task
    this.task = {
      id: this.id,
      task_category_id: this.categoryId,
      title: this.title.trim(),
      priority: parseInt(this.priority),
      date: this.date,
      completed: this.isTaskCompleted
    };

    this.setTaskStateStyles();
  }

  ngAfterViewInit() {
    if (!this.editMode) {
      this.setPriorityStyles();
    }
  }

  setTaskStateStyles() {
    const wrapperClassList: DOMTokenList = this.todoWrapper.nativeElement.classList;
    const checkmarkClassList: DOMTokenList = this.completeTaskButtonCheckmark.nativeElement.classList;

    this.resetTaskStateStyles();

    if (this.task.completed == 1) {
      wrapperClassList.add('taskState', 'taskState__completed');
      checkmarkClassList.add('completeTaskButton__checkMark', 'completeTaskButton__checkMark--show');
    }
  }

  resetTaskStateStyles() {
    const wrapperClassList: DOMTokenList = this.todoWrapper.nativeElement.classList;
    const checkmarkClassList: DOMTokenList = this.completeTaskButtonCheckmark.nativeElement.classList;

    const wrapperClassesToRemove = [];
    const checkmarkClassesToRemove = [];

    wrapperClassList.forEach(className => {
      if (className.includes('taskState')) {
        wrapperClassesToRemove.push(className);
      }
    });

    checkmarkClassList.forEach(className => {
      if (className.includes('completeTaskButton__checkMark--')) {
        checkmarkClassesToRemove.push(className);
      }
    });

    wrapperClassesToRemove.forEach(className => {
      wrapperClassList.remove(className);
    });

    checkmarkClassesToRemove.forEach(className => {
      checkmarkClassList.remove(className);
    });
  }

  togglePriority() {
    switch (this.task.priority) {
      case 1:
        this.task.priority = 2;
        break;
      case 2:
        this.task.priority = 3;
        break;
      case 3:
        this.task.priority = 1;
        break;
    }

    this.setPriorityStyles();
  }

  setPriorityStyles() {
    this.resetPriorityStyles();

    switch (this.task.priority) {
      case 1:
        this.priorityIcon.nativeElement.classList.add('priority__icon--low');
        this.priorityText.nativeElement.classList.add('priority__text--low');
        break;
      case 2:
        this.priorityIcon.nativeElement.classList.add('priority__icon--normal');
        this.priorityText.nativeElement.classList.add('priority__text--normal');
        break;
      case 3:
        this.priorityIcon.nativeElement.classList.add('priority__icon--high');
        this.priorityText.nativeElement.classList.add('priority__text--high');
        break;
    }
  }

  resetPriorityStyles() {
    this.priorityText.nativeElement.classList.forEach(className => {
      this.priorityText.nativeElement.classList.remove(className);
    });

    this.priorityIcon.nativeElement.classList.forEach(className => {
      if (className.includes('priority__icon')) {
        this.priorityIcon.nativeElement.classList.remove(className);
      }
    });
  }

  toggleCompleted() {
    if (!this.editMode) {

      if (this.task.completed == 0) {
        this.task.completed = 1;

        this._tasksApiService.updateTask(this.task.id, this.task).subscribe(data => {
          if(data){
            console.log('Task completed:' , data);
          }
        });
      } else {
        this.task.completed = 0;

        this._tasksApiService.updateTask(this.task.id, this.task).subscribe(data => {
          if(data){
            console.log('Task uncompleted:', data);
          }
        });
      }

      this.setTaskStateStyles();
    }
  }

  turnOnEditMode() {
    if (!this.editMode) {
      this.toggleEditModeStyles('on');

      //  Temporarily saving the task values before turning edit mode ON
      this._tempTaskValues = {
        title: this.task.title.trim(),
        priority: this.task.priority,
        date: this.date
      };

      this.editModeSubject.next(true);
    }
  }

  turnOffEditMode() {
    if (this.editMode) {
      this.toggleEditModeStyles('off');

      //  make an object with the possibly updated values
      const updatedTask: Task = {
        title: this.task.title.trim(),
        priority: this.task.priority,
        date: this.input_date.nativeElement.value
      };

      if (JSON.stringify(this._tempTaskValues) !== JSON.stringify(updatedTask)) {
        this.updateTask(updatedTask);

        console.log('values differ, updating...');
      }

      this.editModeSubject.next(false);
    }
  }

  toggleEditModeStyles(action: string) {
    if (action === 'on') {
      this.completeTaskButton.nativeElement.classList.remove('completeTaskButton--return');
      this.completeTaskButton.nativeElement.classList.add('completeTaskButton--hide');
      this.removeTaskButton.nativeElement.classList.add('removeTaskButton--reveal');
      this.removeTaskButton.nativeElement.classList.remove('removeTaskButton--hide');
      this.todoWrapper.nativeElement.classList.add('todoWrapper__editMode');
      this.priorityIcon.nativeElement.parentElement.classList.add('priority--editMode');

    } else if (action === 'off') {
      this.completeTaskButton.nativeElement.classList.remove('completeTaskButton--hide');
      this.completeTaskButton.nativeElement.classList.add('completeTaskButton--return');
      this.removeTaskButton.nativeElement.classList.remove('removeTaskButton--reveal');
      this.removeTaskButton.nativeElement.classList.add('removeTaskButton--hide');
      this.todoWrapper.nativeElement.classList.remove('todoWrapper__editMode');
      this.priorityIcon.nativeElement.parentElement.classList.remove('priority--editMode');
    }
  }

  updateTask(task: Task) {
    if (task.title) {
      console.log("Task to update: ", task);

      this._tasksApiService.updateTask(this.task.id, task).subscribe(data => {
        if (data) {
          this.onUpdateTask.emit(data);
        }
      });
    } else {
      this.onUpdateTask.emit();
      this.task.title = this._tempTaskValues.title;
    }
  }
}

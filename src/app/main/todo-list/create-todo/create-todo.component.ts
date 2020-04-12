import { TasksApiService } from './../../../services/api/tasks-api.service';
import { Task } from './../../../models/task';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskSuggestionsService } from 'src/app/services/task-suggestions.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss', './../todo/todo.component.scss']
})
export class CreateTodoComponent implements OnInit, AfterViewInit {
  @Output() onClickAway: EventEmitter<any> = new EventEmitter();
  @Output() onTaskCreated: EventEmitter<any> = new EventEmitter();

  @Input() selectedCategory: string;

  @ViewChild('priorityIcon', { static: true }) priorityIcon: ElementRef;
  @ViewChild('priorityText', { static: true }) priorityText: ElementRef;
  @ViewChild('input_title', { static: true }) input_title: ElementRef;

  taskTitle = '';
  taskDate = '';
  priority = '2';

  taskPlaceholder: string;

  //  helper / getaround variables
  _clickAwayOmittedFirst = false;
  _savingTask = false;
  _formSubmitErrors = false;

  constructor(
    private _tasksSuggestions: TaskSuggestionsService,
    private _tasksApiService: TasksApiService
  ) { }

  ngOnInit() {
    this.input_title.nativeElement.focus();
    this.taskPlaceholder = this.getRandomTaskSuggestion();
  }

  ngAfterViewInit() {
    this.setPriorityStyles();
  }

  getRandomTaskSuggestion() {
    const randomIndexFromArray = Math.floor(Math.random() * this._tasksSuggestions.tasksSuggestions.length);
    return this._tasksSuggestions.tasksSuggestions[randomIndexFromArray];
  }

  togglePriority() {
    switch (this.priority) {
      case '1':
        this.priority = '2';
        break;
      case '2':
        this.priority = '3';
        break;
      case '3':
        this.priority = '1';
        break;
    }

    this.setPriorityStyles();
  }

  setPriorityStyles() {
    this.resetPriorityStyles();

    switch (this.priority) {
      case '1':
        this.priorityIcon.nativeElement.classList.add('priority__icon--low');
        this.priorityText.nativeElement.classList.add('priority__text--low');
        break;
      case '2':
        this.priorityIcon.nativeElement.classList.add('priority__icon--normal');
        this.priorityText.nativeElement.classList.add('priority__text--normal');
        break;
      case '3':
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

  saveTask() {
    if (this.taskTitle !== '') {
      if (!this._savingTask) {
        this._savingTask = true;

        const task: Task = {
          task_category_id: this.selectedCategory,
          title: this.taskTitle,
          priority: parseInt(this.priority)
        };

        if (this.taskDate) {
          task.date = this.taskDate;
        }

        console.log('Saving task: ', task);

        this._tasksApiService.createTask(task).subscribe(data => {
          if (data) {
            this.onTaskCreated.emit(data);

            this._savingTask = false;
          }
        });
      }
    } else {
      this._formSubmitErrors = true;
    }
  }

  setPlaceholderAsValue(event: Event) {
    event.preventDefault();
    this.taskTitle = this.taskPlaceholder;
  }
}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TaskSuggestionsService } from 'src/app/services/task-suggestions.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss', './../todo/todo.component.scss']
})
export class CreateTodoComponent implements OnInit, AfterViewInit {
  @Output() onClickAway: EventEmitter<any> = new EventEmitter();

  @ViewChild('priorityIcon', { static: true }) priorityIcon: ElementRef;
  @ViewChild('priorityText', { static: true }) priorityText: ElementRef;
  @ViewChild('input_title', { static: true }) input_title: ElementRef;

  priority = 'normal';
  taskPlaceholder: string;
  taskValue: string = "";
  _clickAwayOmittedFirst = false;

  constructor(private _tasksSuggestions: TaskSuggestionsService) { }

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
      case 'low':
        this.priority = 'normal';
        break;
      case 'normal':
        this.priority = 'high';
        break;
      case 'high':
        this.priority = 'low';
        break;
    }

    this.setPriorityStyles();
  }

  setPriorityStyles() {
    this.resetPriorityStyles();

    switch (this.priority) {
      case 'low':
        this.priorityIcon.nativeElement.classList.add('priority__icon--low');
        this.priorityText.nativeElement.classList.add('priority__text--low');
        break;
      case 'normal':
        this.priorityIcon.nativeElement.classList.add('priority__icon--normal');
        this.priorityText.nativeElement.classList.add('priority__text--normal');
        break;
      case 'high':
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
    if (this.taskValue !== '') {
      console.log('saving: ', this.taskValue);
    }
  }

  setPlaceholderAsValue(event: Event){
    event.preventDefault();
    this.taskValue = this.taskPlaceholder;
  }
}

import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, AfterViewInit {
  @Input() todoState: string;
  @Input() title: string;
  @Input() completionDate: string;
  @Input() priority: string;

  @ViewChild('todoWrapper', { static: true }) todoWrapper: ElementRef;
  @ViewChild('priorityIcon', { static: false }) priorityIcon: ElementRef;
  @ViewChild('priorityText', { static: false }) priorityText: ElementRef;
  @ViewChild('completeTaskButtonCheckmark', { static: true }) completeTaskButtonCheckmark: ElementRef;
  @ViewChild('completeTaskButton', { static: true }) completeTaskButton: ElementRef;
  @ViewChild('removeTaskButton', { static: false }) removeTaskButton: ElementRef;

  //  Elements for editing task
  @ViewChild('input_title', { static: false }) input_title: ElementRef;
  @ViewChild('input_completionDate', { static: false }) input_completionDate: ElementRef;

  //  Edit mode
  editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode = false;
  _temp_hrefID: string;
  _tempTaskDataValues: { title: string, completionDate: string, priority: string };

  constructor() { }

  ngOnInit() {
    this.toggleTodoStateStyles();

    this.editModeSubject.subscribe(mode => {
      this.editMode = mode;
    });
  }

  ngAfterViewInit() {
    if (!this.editMode) {
      this.setPriorityStyles();
    }
  }

  toggleTodoStateStyles() {
    const wrapperClassList: DOMTokenList = this.todoWrapper.nativeElement.classList;
    const checkmarkClassList: DOMTokenList = this.completeTaskButtonCheckmark.nativeElement.classList;

    this.resetTaskStateStyle();

    switch (this.todoState) {
      case 'completed':
        wrapperClassList.add('taskState', 'taskState__completed');
        checkmarkClassList.add('completeTaskButton__checkMark', 'completeTaskButton__checkMark--show');
        break;
      case 'overtime':
        break;
      case 'pending':
        break;
    }
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

  resetTaskStateStyle() {
    const wrapperClassList: DOMTokenList = this.todoWrapper.nativeElement.classList;
    const checkmarkClassList: DOMTokenList = this.completeTaskButtonCheckmark.nativeElement.classList;

    wrapperClassList.forEach(className => {
      if (className.includes('taskState')) {
        wrapperClassList.remove(className);
      }
    });

    checkmarkClassList.forEach(className => {
      checkmarkClassList.remove(className);
    });
  }

  resetPriorityStyles(){
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
      switch (this.todoState) {
        case 'completed':
          this.todoState = 'pending';
          break;
        case 'pending':
          this.todoState = 'completed';
          break;
      }

      this.toggleTodoStateStyles();
    }
  }

  turnOnEditMode() {
    if (!this.editMode) {
      const linkElement = this.todoWrapper.nativeElement.parentElement.parentElement;
      this._temp_hrefID = linkElement.getAttribute('href');
      linkElement.removeAttribute('href');

      this.toggleEditModeStyles('on');

      //  Temporarily saving the task values before turning edit mode ON
      this._tempTaskDataValues = {
        title: this.title,
        priority: this.priority,
        completionDate: this.completionDate
      };

      this.editModeSubject.next(true);

      setTimeout(() => {
        this.input_title.nativeElement.focus();
      }, 0);
    }
  }

  turnOffEditMode() {
    if (this.editMode) {
      const linkElement = this.todoWrapper.nativeElement.parentElement.parentElement;
      linkElement.setAttribute('href', this._temp_hrefID);

      this.toggleEditModeStyles('off');

      //  make an object with the possibly updated values
      const updatedTaskValues = {
        title: this.input_title.nativeElement.value,
        priority: this.priority,
        completionDate: this.input_completionDate.nativeElement.value
      };

      if (JSON.stringify(this._tempTaskDataValues) !== JSON.stringify(updatedTaskValues)) {
        this.updateTask(updatedTaskValues);
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


  togglePriorityStyles() {
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

  updateTask(updatedTaskValues: any) {
    console.log('updating tasks with values: ', updatedTaskValues);
  }
}

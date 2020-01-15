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
  @Input() completionTime: string;
  @Input() priority: string;

  @ViewChild('todoWrapper', { static: true }) todoWrapper: ElementRef;
  @ViewChild('priorityIcon', { static: false }) priorityIcon: ElementRef;
  @ViewChild('priorityText', { static: false }) priorityText: ElementRef;
  @ViewChild('completeTaskButtonCheckmark', { static: true }) completeTaskButtonCheckmark: ElementRef;
  @ViewChild('completeTaskButton', { static: true }) completeTaskButton: ElementRef;
  @ViewChild('removeTaskButton', { static: false }) removeTaskButton: ElementRef;

  //  Elements for editing task
  @ViewChild('input_title', { static: false }) input_title: ElementRef;

  //  Edit mode
  editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode = false;
  _temp_hrefID: string;


  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (clickedInside) {

    } else {
      this.turnOffEditMode();
    }
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.toggleTodoState();

    this.editModeSubject.subscribe(mode => {
      this.editMode = mode;
    });
  }

  ngAfterViewInit() {
    if (!this.editMode) {
      this.setPriorityStyles();
    }
  }

  toggleTodoState() {
    let wrapperClassList: DOMTokenList = this.todoWrapper.nativeElement.classList;
    let checkmarkClassList: DOMTokenList = this.completeTaskButtonCheckmark.nativeElement.classList;

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

    //reset styles
    this.priorityText.nativeElement.classList.forEach(className => {
      this.priorityText.nativeElement.classList.remove(className);
    });

    this.priorityIcon.nativeElement.classList.forEach(className => {
      if (className.includes('priority__icon')) {
        this.priorityIcon.nativeElement.classList.remove(className);
      }
    });

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

      this.toggleTodoState();
    }
  }

  turnOnEditMode() {
    if (!this.editMode) {
      const linkElement = this.todoWrapper.nativeElement.parentElement.parentElement;
      this._temp_hrefID = linkElement.getAttribute('href');
      linkElement.removeAttribute('href');

      this.toggleEditModeStyles('on');

      this.editModeSubject.next(true);
    }
  }

  turnOffEditMode() {
    if (this.editMode) {
      const linkElement = this.todoWrapper.nativeElement.parentElement.parentElement;
      linkElement.setAttribute('href', this._temp_hrefID);

      this.toggleEditModeStyles('off');

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
}

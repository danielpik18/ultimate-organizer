import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsManagerService } from 'src/app/services/notifications-manager.service';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, AfterViewInit {
  @Input() taskId: string;
  @Input() isTaskCompleted: number;
  @Input() title: string;
  @Input() date: string;
  @Input() priority: string;

  @Output() onRemoveTaskButtonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('todoWrapper', { static: true }) todoWrapper: ElementRef;
  @ViewChild('priorityIcon') priorityIcon: ElementRef;
  @ViewChild('priorityText') priorityText: ElementRef;
  @ViewChild('completeTaskButtonCheckmark', { static: true }) completeTaskButtonCheckmark: ElementRef;
  @ViewChild('completeTaskButton', { static: true }) completeTaskButton: ElementRef;
  @ViewChild('removeTaskButton') removeTaskButton: ElementRef;

  //  Elements for editing task
  @ViewChild('input_title') input_title: ElementRef;
  @ViewChild('input_date') input_date: ElementRef;

  //  Edit mode
  editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode = false;

  //
  _tempTaskDataValues: any;

  constructor(
    private _notificationsManager: NotificationsManagerService,
    private _helperFunctions: HelperFunctionsService,
    private _colorPalette: ColorPaletteService
  ) { }

  ngOnInit() {
    this.setTaskStateStyles();

    this.editModeSubject.subscribe(mode => {
      this.editMode = mode;
    });
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

    if (this.isTaskCompleted == 1) {
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

  setPriorityStyles() {
    this.resetPriorityStyles();

    switch (this.priority) {
      case '1':
        console.log('here 1')
        this.priorityIcon.nativeElement.classList.add('priority__icon--low');
        this.priorityText.nativeElement.classList.add('priority__text--low');
        break;
      case '2':
        console.log('here 2')
        this.priorityIcon.nativeElement.classList.add('priority__icon--normal');
        this.priorityText.nativeElement.classList.add('priority__text--normal');
        break;
      case '3':
        console.log('here 3')
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

      if (this.isTaskCompleted == 0) {
        this.isTaskCompleted = 1;
      } else {
        this.isTaskCompleted = 0;
      }

      this.setTaskStateStyles();
    }
  }

  turnOnEditMode() {
    if (!this.editMode) {
      this.toggleEditModeStyles('on');

      //  Temporarily saving the task values before turning edit mode ON
      this._tempTaskDataValues = {
        title: this.title,
        priority: this.priority,
        date: this.date
      };

      this.editModeSubject.next(true);
    }
  }

  turnOffEditMode() {
    if (this.editMode) {
      this.toggleEditModeStyles('off');

      //  make an object with the possibly updated values
      const updatedTaskValues = {
        title: this.title,
        priority: this.priority,
        date: this.input_date.nativeElement.value
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

  updateTask(updatedTaskValues: any) {
    console.log('updating tasks with values: ', updatedTaskValues);


    this._notificationsManager.pushNotification(
      'Tasks',
      updatedTaskValues.title,
      this._helperFunctions.getCurrentTimeIn12HourFormat(),
      this._colorPalette.getColorHex('red_light')
    );
  }
}

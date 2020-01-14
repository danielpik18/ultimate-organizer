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

  //Elements for editing task
  @ViewChild('input_title', { static: false }) input_title: ElementRef;

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (clickedInside) {
      this.turnOnEditMode();
    } else {
      this.turnOffEditMode();
    }
  }

  //Edit mode
  editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode: boolean = false;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.toggleTodoState();

    this.editModeSubject.subscribe(mode => {
      this.editMode = mode;
    });
  }

  ngAfterViewInit(){
    if(!this.editMode){
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

  resetTaskStateStyle(){
    let wrapperClassList: DOMTokenList = this.todoWrapper.nativeElement.classList;
    let checkmarkClassList: DOMTokenList = this.completeTaskButtonCheckmark.nativeElement.classList;

    wrapperClassList.forEach(className => {
      if(className.includes('taskState')){
        wrapperClassList.remove(className);
      }
    });

    checkmarkClassList.forEach(className => {
      checkmarkClassList.remove(className);
    });
  }

  toggleCompleted(){
    switch(this.todoState){
      case 'completed':
        this.todoState = 'pending';
        break;
      case 'pending':
        this.todoState = 'completed';
        break;
    }

    this.toggleTodoState();
  }

  turnOnEditMode(){
      this.editModeSubject.next(true);
      this.todoWrapper.nativeElement.parentElement.parentElement.removeAttribute('href');
  }

  turnOffEditMode(){
    if(this.editMode){
      this.editModeSubject.next(false);
      this.todoWrapper.nativeElement.parentElement.parentElement.removeAttribute('href');
    }
  }

}

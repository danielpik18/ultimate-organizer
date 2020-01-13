import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todoState: string;
  @Input() title: string;
  @Input() completionTime: string;
  @Input() priority: string;

  @ViewChild('todoWrapper', { static: true }) todoWrapper: ElementRef;
  @ViewChild('priorityIcon', { static: true }) priorityIcon: ElementRef;
  @ViewChild('priorityText', { static: true }) priorityText: ElementRef;
  @ViewChild('completeTaskButtonCheckmark', { static: true }) completeTaskButtonCheckmark: ElementRef;

  constructor() { }

  ngOnInit() {
    this.toggleTodoState();
    this.toggleTodoPriority();
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
        //console.log('task overtime');
        break;
    }
  }

  toggleTodoPriority() {
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

}

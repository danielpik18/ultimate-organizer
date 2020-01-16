import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { HttpManagerService } from 'src/app/services/http-manager.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChild('todoList', { static: true }) todoList: ElementRef;
  showDeleteModal: boolean = false;

  todos: any[];

  constructor(private httpManager: HttpManagerService) { }

  ngOnInit() {
    this.httpManager.getTodos().subscribe(data => this.todos = data);
  }

  filterData(filter: string) {
    console.log('test', filter);
  }

  toggleDeleteModal(taskId: string = null){
    if(taskId){
      console.log(taskId);
    }
    this.showDeleteModal = !this.showDeleteModal;
  }
}

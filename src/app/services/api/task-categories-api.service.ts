import { retry, catchError } from 'rxjs/operators';
import { TaskCategory } from './../../models/task-category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskCategoriesApiService extends BaseApiService{

  constructor(private http: HttpClient) {
    super();
  }

  getTaskCategories(): Observable<any>{
    return this.http.get<TaskCategory>(`${this.apiUrl}/task_categories`);
  }

  createTaskCategory(taskCategory: TaskCategory): Observable<any> {
    return this.http.post(`${this.apiUrl}/task_categories`, JSON.stringify(taskCategory), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteTaskCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/task_categories/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

}

import { BaseApiService } from './base-api.service';
import { Task } from './../../models/task';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService extends BaseApiService {

  constructor(private http: HttpClient) {
    super();
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, JSON.stringify(task), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateTask(id: string, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, JSON.stringify(task), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}

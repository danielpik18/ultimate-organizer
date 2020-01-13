import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpManagerService {
  private apiUrl: string = "http://space.local/api";

  constructor(private http: HttpClient) { }

  getTodos(): any {
    return this.http.get(`${this.apiUrl}/todos`);
  }
}

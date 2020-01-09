import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsManagerService {
  windows = new Subject<string[]>();

  constructor() { }

  getWindows(): Observable<string[]> {
    return this.windows.asObservable();
  }

  updateWindows(windows: string[]) {
    this.windows.next(windows);
  }
}

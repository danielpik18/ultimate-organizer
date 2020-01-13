import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsManagerService {
  private windows = new BehaviorSubject<string[]>([]);

  constructor() { }

  getWindows(): Observable<string[]> {
    return this.windows.asObservable();
  }

  updateWindows(windows: string[]) {
    this.windows.next(windows);
  }
}

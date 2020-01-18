import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsManagerService {
  notifications: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  getAllNotifications() {
    return this.notifications.asObservable();
  }

  pushNotification(windowName: string, message: string, time: string, colorHex: string) {
    this.notifications.next([{
      windowName,
      message,
      time,
      colorHex
    }, ...this.notifications.getValue()]);
  }

  constructor() { }
}

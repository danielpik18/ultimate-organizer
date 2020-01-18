import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationsManagerService } from 'src/app/services/notifications-manager.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @ViewChild('notificationsList', { static: true }) notificationsList: ElementRef;

  notifications: any = [];

  constructor(private _notificationsManager: NotificationsManagerService) { }

  ngOnInit() {
    this._notificationsManager.getAllNotifications().subscribe(notifications => this.notifications = notifications);
  }

}

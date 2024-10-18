import { Component, Input } from '@angular/core';
import { Notification } from '../models/Notifications';
import { NotificationStore } from '../signal/NotificationsStore';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {octCheckCircle,octTrash} from '@ng-icons/octicons';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { NgIconComponent } from '@ng-icons/core';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-notif-item',
  standalone: true,
  imports: [HlmButtonDirective,HlmIconComponent,NgIconComponent,DatePipe],
  templateUrl: './notif-item.component.html',
  styleUrl: './notif-item.component.css',
  providers: [
    provideIcons({
      octCheckCircle,octTrash
    }),
  ],
})
export class NotifItemComponent {
  @Input() notif!: Notification;

  constructor(private notificationStore : NotificationStore) {}

  markAsRead() {
    this.notificationStore.markAsRead(this.notif.id);
  }

  deleteNotification() {
    this.notificationStore.deleteNotification(this.notif.id);
  }

}

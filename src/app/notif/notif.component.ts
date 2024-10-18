import { Component, effect } from '@angular/core';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { NotifItemComponent } from '../notif-item/notif-item.component';
import { NotificationStore } from '../signal/NotificationsStore';
import { Notification } from '../models/Notifications';
import { CommonModule } from '@angular/common';
import { NotificationStompService } from '../services/notifications.stomp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notif',
  standalone: true,
  imports: [LeftSideBarComponent, NotifItemComponent,CommonModule],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.css',
})
export class NotifComponent {
  notifications: Notification[] = [];
  stompNotifSub: Subscription | undefined;
  constructor(private notificationStore: NotificationStore , private stomp : NotificationStompService ) {
    effect(() => {
      this.notifications = this.notificationStore.notifications();
      this.notifications = this.sortNotifsDescending(this.notifications);
    });
  }

  // Fonction pour trier les post en ordre décroissant
  sortNotifsDescending(notifs: Notification[]): Notification[] {
    return notifs.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  markAllAsRead() {
    this.notificationStore.markAllAsRead();
  }

  currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  private subscribeToNotifications() {
    this.stomp.subscribe('/user/' + this.currentUser.id + '/queue/notifications').subscribe({
      next: (data: any) => {
        this.notificationStore.addNotification(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }



}


import { Injectable, signal } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/Notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationStore {
  // Signal pour stocker la liste des posts
  notifications = signal<Notification[]>([]);

  constructor(private notificationService: NotificationService) {
    this.loadNotifications();
  }

  loadNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.notificationService.getAllNotificationssOfUser(currentUser.id).subscribe({
      next: (notifications) => {
        //console.log('Notifications:', notifications);
        this.notifications.set(notifications); // Met à jour le signal avec les posts récupérés
        // Déclenche une mise à jour manuelle dans le composant
        this.notifications.update((currentNotifications) => [...currentNotifications]);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des posts', error);
      },
    });
  }
  
  addNotification(notification: Notification) {
    this.notifications.update((currentNotifications) => [notification, ...currentNotifications]);
  }

  markAsRead(notificationId: string) {
    this.notificationService.masrkAsRead(notificationId).subscribe(() => {
      this.notifications.update((currentNotifications) => {
        return currentNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        );
      });
    });
  }
  
  

  markAllAsRead() {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.notificationService.markAllAsRead(currentUser.id).subscribe(() => {
      this.notifications.update((currentNotifications) => {
        return currentNotifications.map((notification) => ({ ...notification, isRead: true }));
      });
    });
  }

  deleteNotification(notificationId: string) {
    this.notificationService.deleteNotification(notificationId).subscribe(() => {
      this.notifications.update((currentNotifications) =>
        currentNotifications.filter((notification) => notification.id !== notificationId)
      );
    });
  }
}

import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { NotifItemComponent } from '../notif-item/notif-item.component';
import { NotificationStore } from '../signal/NotificationsStore';
import { Notification } from '../models/Notifications';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import SockJS from 'sockjs-client'; // Corrige l'importation
import { Client, IMessage } from '@stomp/stompjs';

@Component({
  selector: 'app-notif',
  standalone: true,
  imports: [LeftSideBarComponent, NotifItemComponent, CommonModule],
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css'],
})
export class NotifComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private stompClient: Client | undefined;

  constructor(private notificationStore: NotificationStore) {
    effect(() => {
      this.notifications = this.notificationStore.notifications();
      this.notifications = this.sortNotifsDescending(this.notifications);
    });
  }

  ngOnInit(): void {
    this.connectToWebSocket();
  }

  ngOnDestroy(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('WebSocket disconnected');
    }
  }

  // Fonction pour trier les notifications en ordre décroissant
  sortNotifsDescending(notifs: Notification[]): Notification[] {
    return notifs.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  // Fonction pour marquer toutes les notifications comme lues
  markAllAsRead() {
    this.notificationStore.markAllAsRead();
  }

  // Fonction pour se connecter au WebSocket via STOMP
  private connectToWebSocket(): void {
    const socketUrl = 'http://localhost:8080/ws'; // URL du WebSocket
    const socket = new SockJS(socketUrl); // Utilisation correcte de SockJS
    this.stompClient = new Client({
      webSocketFactory: () => socket as any, // Création du WebSocket avec SockJS
      debug: (str) => {
        console.log(str); // Pour logguer les messages STOMP
      },
      reconnectDelay: 5000, // Si la connexion échoue, essaye de se reconnecter après 5 secondes
    });

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser?.id; // Récupérer l'ID utilisateur à partir de `localStorage`

    if (userId && this.stompClient) {
      this.stompClient.onConnect = () => {
        console.log('WebSocket connected for user:', userId);

        // S'abonner aux notifications pour cet utilisateur
        this.stompClient?.subscribe(
          `/user/${userId}/notifications`,
          (message: IMessage) => {
            const notification: Notification = JSON.parse(message.body);
            console.log('Notification received:', notification);

            // Ajouter la notification reçue au store et mettre à jour la liste
            this.notificationStore.addNotification(notification);
            this.notifications = this.sortNotifsDescending(
              this.notificationStore.notifications()
            );
          }
        );
      };

      console.log('Activating WebSocket connection...');
      this.stompClient.activate();
      console.log('WebSocket connection activated.');
    }
  }
}

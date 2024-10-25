import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../models/Notifications';
import { NotificationStore } from '../signal/NotificationsStore';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {octCheckCircle,octTrash} from '@ng-icons/octicons';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { NgIconComponent } from '@ng-icons/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../services/user.service';
import { AvatarComponent } from "../avatar/avatar.component";



@Component({
  selector: 'app-notif-item',
  standalone: true,
  imports: [HlmButtonDirective, HlmIconComponent, NgIconComponent, DatePipe, CommonModule, AvatarComponent],
  templateUrl: './notif-item.component.html',
  styleUrl: './notif-item.component.css',
  providers: [
    provideIcons({
      octCheckCircle,octTrash
    }),
  ],
})
export class NotifItemComponent implements OnInit{
  @Input() notif!: Notification;
  User : any ;
  constructor(private notificationStore : NotificationStore , private userService  : UserService) {}
  ngOnInit(): void {
    this.userService.getUserById(this.notif.senderId).subscribe({
      next: (data) => {
        this.User = data;
      },
      error: (error) => {
        console.error(
          'Erreur lors du chargement des données utilisateur',
          error
        );
      },
    })
  }

  markAsRead() {
    this.notificationStore.markAsRead(this.notif.id);
  }

  deleteNotification() {
    this.notificationStore.deleteNotification(this.notif.id);
  }

}

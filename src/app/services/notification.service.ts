import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Notification } from '../models/Notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:8589/api/v1/notifications';

  constructor(private http: HttpClient) {}

  // Récupérer tous les posts depuis le backend
  getAllNotificationssOfUser(userId:string): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl+`/all/${userId}`);
  }

  // marker comme lu

  masrkAsRead(notificationId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/markAsRead/${notificationId}`,{});   
  }

  markAllAsRead(userId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/markAllAsRead/${userId}`,{});   
  }

  deleteNotification(notificationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${notificationId}`);
  }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationStompService {
  private socket: any;
  private stompClient: any | null = null;
  private connected: boolean = false;  // Pour éviter plusieurs connexions

  constructor() {
    this.connect();
  }

  // Connexion au serveur WebSocket avec SockJS et STOMP
  connect(): void {
    if (this.connected) {
      console.warn("Already connected to the WebSocket server.");
      return;
    }

    this.socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, () => {
      this.connected = true;
      console.log("Connected to the WebSocket server");
    }, (error: string) => {
      console.error("WebSocket connection error:", error);
    });
  }

  // S'abonner à une destination privée ou publique via STOMP
  subscribe(destination: string): Observable<any> {
    console.log('destination', destination);
    return new Observable((observer) => {
      if (!this.stompClient || !this.connected) {
        console.error("WebSocket connection not established.");
        return;
      }


      this.stompClient.subscribe(destination, (message: any) => {
        console.log("connected to " + destination);
        observer.next(JSON.parse(message.body));
      });

      /*const subscription = this.stompClient.subscribe(destination, (message: any) => {
        console.log("connected to " + destination);
        observer.next(JSON.parse(message.body));
      });

      // Gestion de désabonnement automatique
      return () => {
        subscription.unsubscribe();
        console.log(`Unsubscribed from ${destination}`);
      };*/
    });
  }

  // Envoyer un message à une destination STOMP
  send(destination: string, data: any): void {
    if (!this.stompClient || !this.connected) {
      console.error("Cannot send message: WebSocket not connected.");
      return;
    }

    this.stompClient.send(destination, {}, JSON.stringify(data));
    console.log(`Message sent to ${destination}:`, data);
  }
}

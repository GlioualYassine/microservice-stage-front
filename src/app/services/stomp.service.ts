import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
    providedIn : 'root'
})

export class StompService {
    private socket : any ;
    private stompClient : any ;
    constructor() {
            this.connect();
    }
  // Establish the connection to the WebSocket server using SockJS and Stomp
  connect() {
    this.socket = new SockJS("http://localhost:8090/stomp-endpoint");
    this.stompClient = Stomp.over(this.socket);

    // Connect to the WebSocket server
    this.stompClient.connect({}, () => {
      console.log("Connected to the WebSocket server");
    });
  }

  subscribe(topic:string):Observable<any>{

    return new Observable((observer)=>{
        this.stompClient.subscribe('/topic/'+topic,(message : any) : any =>{
            //Parse the message from the server
            observer.next(JSON.parse(message.body));
        })
    })
  }

  send(app:string , data : any){
    this.stompClient.send("/app/"+app,{},JSON.stringify(data));
  }

}
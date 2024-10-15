import { Component, OnInit } from '@angular/core';
import { ConversationResponse } from '../models/ConversationResponse';
import { Subscription } from 'rxjs';
import { MessageResponse } from '../models/MessageResponse';
import { StompService } from '../services/stomp.service';
import { WebSocketResponse } from '../models/WebSocketResponse';
import { MessageSocketsService } from '../services/message.sockets.service';
import { ApiResponse } from '../models/ApiResponse';
import { MessageRequest } from '../models/MessageRequest';
import { UserService } from '../services/user.service';
import { sideBarData } from '../data/sidebar.data';
import { CommonModule } from '@angular/common';
import { RightSideBarItemComponent } from "../right-side-bar-item/right-side-bar-item.component";
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports:[RightSideBarItemComponent,CommonModule,HlmScrollAreaComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  CurrentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  userConversations: ConversationResponse[] = [];
  friendList : any = [];

  //webSocket subscriptions
  stompUserSub: Subscription | undefined;
  stompConvSub: Subscription | undefined;
  stompOnlineUsersSub: Subscription | undefined;
  stompOfflineUsersSub: Subscription | undefined;

  SelectedConversationId: string = '';
  SelectedConversationReceiverId: string = '';
  SelectedConversationReceiverName: string = '';
  SelectedConversation: MessageResponse[] = [];

  showUserState: boolean = false;
  message: string = '';

  onlineUserNotifications: string | null = null;

  constructor(private stomp: StompService , private conversationService :MessageSocketsService ,private userService : UserService) {}
  ngOnInit(): void {
    this.userService.getUserFriendList(this.CurrentUser.id).subscribe({
      next: (data : any) => {
        this.friendList = data.friends;
        //console.log("data",data)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy(): void {
    this.stompUserSub?.unsubscribe();
    this.stompConvSub?.unsubscribe();
    this.stompOnlineUsersSub?.unsubscribe();
    this.stompOfflineUsersSub?.unsubscribe();
  }

  onCloseChat() {
    this.stompConvSub?.unsubscribe();
    this.SelectedConversationId = '';
  }

 /* subscribeToCurrentUserConversation() {
    setTimeout(() => {
      this.stompUserSub = this.stomp.subscribe("user/"+this.CurrentUser.id)
      .subscribe((payload : any)=>{
        let res : WebSocketResponse = payload; 
        if(res.type == 'ALL'){
          this.userConversations = res.data;
          const found = this.userConversations.find(
            (item)=>item.conversationId === this.SelectedConversationId
          )
          if(!found){
            this.onCloseChat();
          }
        }
      });

      // Notify the server that the user is online
      this.stomp.send("user/",this.CurrentUser.id)

    }, 1000);
  }*/

  

  onConversationSelected(index : number){
    this.SelectedConversationId = this.userConversations[index].conversationId;
    this.SelectedConversationReceiverId = this.userConversations[index].otherUserId;
    this.SelectedConversationReceiverName = this.userConversations[index].otherUserName;
    this.setConversation();
  }

  // set a conversation for the selected conversationId
  setConversation(){
    this.stompConvSub ?.unsubscribe();
    this.stompConvSub = this.stomp
    .subscribe("conv/"+this.SelectedConversationId)
    .subscribe((payload:any)=>{
      let res : WebSocketResponse = payload;
      if(res.type === 'ALL'){
        this.SelectedConversation = res.data;
      }
      else if (res.type === 'ADDED'){
        let msg : MessageResponse = res.data ;
        this.SelectedConversation.unshift(msg);
      }
    })

    this.stomp.send('conv',this.SelectedConversationId)

  }

  onSendMessage(){
    if(this.message.trim().length == 0)
      return ; 
    const timestamp = new Date() 
    let body : MessageRequest = {
      conversationId : this.SelectedConversationId,
      senderId : this.CurrentUser.id,
      receiverId : this.SelectedConversationReceiverId,
      message : this.message.trim(),
      timestamp : timestamp
    }
    this.stomp.send('sendMessage',body)
    this.message = '';
  }

  onDeleteConversation(){
    this.stomp.send('deleteConversation',
      {
        conversationId : this.SelectedConversationId,
        user1Id : this.CurrentUser.id,
        user2Id : this.SelectedConversationReceiverId
      }
    )
  }

  onDeleteMessage(messageId : string){
    this.stomp.send('deleteMessage',{
      conversationId : this.SelectedConversationId,
      messageId : messageId
    })
  }

}

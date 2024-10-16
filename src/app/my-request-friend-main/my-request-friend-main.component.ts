import { Component, OnInit } from '@angular/core';
import { FriendRquestItemComponent } from "../friend-rquest-item/friend-rquest-item.component";
import { friendshipsService } from '../services/friendship.service';
import { CommonModule } from '@angular/common';
import { FriendRequestRespondComponent } from "../friend-request-respond/friend-request-respond.component";

@Component({
  selector: 'app-my-request-friend-main',
  standalone: true,
  imports: [ FriendRquestItemComponent, CommonModule, FriendRequestRespondComponent],
  templateUrl: './my-request-friend-main.component.html',
  styleUrl: './my-request-friend-main.component.css'
})
export class MyRequestFriendMainComponent  implements OnInit{
  users : any = [];
  currentUserId : any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private friendShipService : friendshipsService) { }
  ngOnInit(): void {
    this.friendShipService.GetFriendRequestsReceived(this.currentUserId.id).subscribe({
      next: (data : any) => {
        this.users = data;
        console.log("data",data)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { LeftSideBarComponent } from "../left-side-bar/left-side-bar.component";
import { FriendRquestItemComponent } from "../friend-rquest-item/friend-rquest-item.component";
import { HeaderComponent } from "../header/header.component";
import { UserService } from '../services/user.service';
import { UserResponse } from '../models/UserResponse';
import { CommonModule } from '@angular/common';
import { friendshipsService } from '../services/friendship.service';

@Component({
  selector: 'app-friend-request-main',
  standalone: true,
  imports: [CommonModule, LeftSideBarComponent, FriendRquestItemComponent, HeaderComponent],
  templateUrl: './friend-request-main.component.html',
  styleUrl: './friend-request-main.component.css'
})
export class FriendRequestMainComponent implements OnInit{
  CurrentUser : any = JSON.parse(localStorage.getItem('user') || '{}');
  users : UserResponse[] = [];
  constructor(private userService : UserService , friendShipService : friendshipsService) { }
  ngOnInit(): void {
    this.userService.getAllUsers(this.CurrentUser.id).subscribe((data : any) => {
        console.log("data", data);
        this.users = data;
    });


  }

  

}

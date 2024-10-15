import { Component, OnInit } from '@angular/core';
import { sideBarData } from '../data/sidebar.data';
import { CommonModule } from '@angular/common';
import { RightSideBarItemComponent } from "../right-side-bar-item/right-side-bar-item.component";
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-right-side-bar-routes',
  standalone: true,
  imports: [RightSideBarItemComponent,CommonModule,HlmScrollAreaComponent],
  templateUrl: './right-side-bar-routes.component.html',
  styleUrl: './right-side-bar-routes.component.css'
})
export class RightSideBarRoutesComponent implements OnInit{
  friendList : any = [];
  currentUser : any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private userService : UserService) { }
  ngOnInit(): void {
    this.userService.getUserFriendList(this.currentUser.id).subscribe({
      next: (data : any) => {
        this.friendList = data.friends;
        console.log("data",data)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


}

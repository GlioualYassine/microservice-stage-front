import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MainContentComponent } from "../main-content/main-content.component";
import { RightSideBarComponent } from "../right-side-bar/right-side-bar.component";
import { FriendRequestMainComponent } from "../friend-request-main/friend-request-main.component";

@Component({
  selector: 'app-friend-request-send',
  standalone: true,
  imports: [HeaderComponent, MainContentComponent, RightSideBarComponent, FriendRequestMainComponent],
  templateUrl: './friend-request-send.component.html',
  styleUrl: './friend-request-send.component.css'
})
export class FriendRequestSendComponent {

}

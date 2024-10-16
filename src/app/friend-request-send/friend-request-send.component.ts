import { Component } from '@angular/core';

import { FriendRequestMainComponent } from "../friend-request-main/friend-request-main.component";
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';

import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { MyRequestFriendMainComponent } from "../my-request-friend-main/my-request-friend-main.component";

@Component({
  selector: 'app-friend-request-send',
  standalone: true,
  imports: [  FriendRequestMainComponent, BrnSeparatorComponent, HlmSeparatorDirective,  MyRequestFriendMainComponent],
  templateUrl: './friend-request-send.component.html',
  styleUrl: './friend-request-send.component.css'
})
export class FriendRequestSendComponent {

}

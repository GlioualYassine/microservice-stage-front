import { Component, Input, OnInit } from '@angular/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../models/UserResponse';
import { friendshipsService } from '../services/friendship.service';
import { FriendshipRequest } from '../models/FriendshipRequest';

@Component({
  selector: 'app-friend-rquest-item',
  standalone: true,
  imports: [BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    CommonModule],
  templateUrl: './friend-rquest-item.component.html',
  styleUrl: './friend-rquest-item.component.css'
})
export class FriendRquestItemComponent implements OnInit {

  @Input() user!: UserResponse;

  CurrentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  isInvitationSent = false;
  constructor(private friendShipService : friendshipsService) { }
  ngOnInit(): void {
   this.friendShipService.checkExistingFriendRequest(this.CurrentUser.id, this.user.id).subscribe({
      next: (data) => {
        //console.log("data",data);
        this.isInvitationSent = data;
      },
      error: (error) => {
        console.log("error",error);
      }
   })
  }
  addFriend = () => {
    //console.log('add friend');
    //alert('add friend');
    

    let FriendshipRequest: FriendshipRequest = { 
      userFromId: this.CurrentUser.id,
      userToId: this.user.id,
      status: 'PENDING',
      createdAt: new Date(),
    };

    this.friendShipService.sendFriendRequest(FriendshipRequest).subscribe(
      {
        next: (data) => {
          //console.log("data",data);
          this.isInvitationSent = true;
        },
        error: (error) => {
          console.log("error",error);
        }
      }
    );
  }

  acceptFriend = () => {
    console.log('accept friend');
    alert('accept friend');
  }

  rejectFriend = () => {
    console.log('reject friend');
    alert('reject friend');
  }

  cancelFriend = () => {
    console.log('cancel friend');
    //alert('cancel friend');
    this.isInvitationSent = false;

  }
}

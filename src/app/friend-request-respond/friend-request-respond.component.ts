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
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';

import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
@Component({
  selector: 'app-friend-request-respond',
  standalone: true,
  imports: [
    BrnCommandImports,
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
    CommonModule,
    
  ],
  templateUrl: './friend-request-respond.component.html',
  styleUrl: './friend-request-respond.component.css',
})
export class FriendRequestRespondComponent implements OnInit {
  @Input() user!: UserResponse;
  accepted = false;
  showReject = false;
  CurrentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private friendShipService: friendshipsService) {}
  ngOnInit(): void {
    
  }
  

  acceptFriend = () => {
    console.log('accept friend');
    this.friendShipService.AcceptFriendRequest(this.CurrentUser.id, this.user.id).subscribe({
      next: (data) => {
        console.log('data', data);
        this.accepted = true;
      },
      error: (error) => {
        console.log(error);
      },
    })
  };

  rejectFriend = () => {
    console.log('reject friend');
    //alert('reject friend');
    this.showReject = true;
  };

  
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { CommonModule } from '@angular/common';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { ConversationComponent } from '../conversation/conversation.component';

import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StompService } from '../services/stomp.service';
import { WebSocketResponse } from '../models/WebSocketResponse';
import { MessageResponse } from '../models/MessageResponse';
import { MessageSocketsService } from '../services/message.sockets.service';
import { ApiResponse } from '../models/ApiResponse';

@Component({
  selector: 'app-right-side-bar-item',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    CommonModule,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    ConversationComponent,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    FormsModule,
  ],
  templateUrl: './right-side-bar-item.component.html',
  styleUrl: './right-side-bar-item.component.css',
})
export class RightSideBarItemComponent  {
  @Input() id!: any;
  @Input() username!: any;
  @Input() avatar!: any;
  @Input() status!: any;
  
  
}

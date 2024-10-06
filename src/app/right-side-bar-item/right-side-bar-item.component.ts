import { Component, Input } from '@angular/core';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { CommonModule } from '@angular/common'; // Import CommonModule
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
import { BrowserModule } from '@angular/platform-browser';

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
export class RightSideBarItemComponent {
  @Input() id!: any;
  @Input() username!: any;
  @Input() avatar!: any;
  @Input() status!: any;


  messages = [
    { sender: 'John', content: 'Hey, how are you?' },
    { sender: 'me', content: 'I am doing good, how about you?' }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'me', content: this.newMessage });
      this.newMessage = '';  // Clear input after sending
    }
  }
}

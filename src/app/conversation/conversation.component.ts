import { Component, Input } from '@angular/core';
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
import { CommonModule } from '@angular/common'; // Import CommonModule

import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';


@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [ BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    CommonModule,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmScrollAreaComponent,
    HlmLabelDirective,
    HlmInputDirective,

    FormsModule,],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent {
 
  @Input() username!: any;
  
  messages = [
    { sender: 'John', content: 'Hey, how are you?', timestamp: new Date('2024-10-06T09:24:00') },
    { sender: 'me', content: 'I am doing good, how about you?', timestamp: new Date('2024-10-06T09:26:00') },
    { sender: 'John', content: 'Great! Just working on a new project.', timestamp: new Date('2024-10-06T09:27:00') },
    { sender: 'me', content: 'That sounds awesome! What kind of project?', timestamp: new Date('2024-10-06T09:29:00') },
    { sender: 'John', content: 'A mobile app for task management.', timestamp: new Date('2024-10-06T09:30:30') },
    { sender: 'John', content: 'It’s been challenging but fun.', timestamp: new Date('2024-10-06T09:31:00') },
    { sender: 'me', content: 'Nice! I’ve been learning more about Angular lately.', timestamp: new Date('2024-10-06T09:33:00') },
    { sender: 'John', content: 'Angular? That’s cool! I heard it’s quite powerful.', timestamp: new Date('2024-10-06T09:34:30') },
    { sender: 'me', content: 'Yes, I’m really enjoying it so far.', timestamp: new Date('2024-10-06T09:36:00') },
    { sender: 'John', content: 'I might give it a try. Any tips for getting started?', timestamp: new Date('2024-10-06T09:37:45') },
    { sender: 'me', content: 'Start with the official docs, and maybe try out some tutorials on YouTube.', timestamp: new Date('2024-10-06T09:39:00') },
    { sender: 'John', content: 'Sounds like a plan! Thanks for the advice.', timestamp: new Date('2024-10-06T09:40:20') },
    { sender: 'me', content: 'No problem! Let me know if you need any help.', timestamp: new Date('2024-10-06T09:42:00') },
    { sender: 'John', content: 'Will do!', timestamp: new Date('2024-10-06T09:43:15') },
    { sender: 'John', content: 'By the way, have you tried the new iOS update?', timestamp: new Date('2024-10-06T09:45:00') },
    { sender: 'me', content: 'Not yet. I’ve heard mixed reviews though.', timestamp: new Date('2024-10-06T09:46:30') },
    { sender: 'John', content: 'Yeah, some cool features but a bit buggy.', timestamp: new Date('2024-10-06T09:48:00') },
    { sender: 'me', content: 'Hopefully they fix those bugs soon.', timestamp: new Date('2024-10-06T09:50:00') },
    { sender: 'John', content: 'Yeah, fingers crossed!', timestamp: new Date('2024-10-06T09:51:15') },
    { sender: 'me', content: 'Alright, I’ll catch you later!', timestamp: new Date('2024-10-06T09:53:00') },
    { sender: 'John', content: 'Talk to you later! Bye!', timestamp: new Date('2024-10-06T09:54:00') }
  ];
  

  newMessage: string = '';

sendMessage() {
  if (this.newMessage.trim()) {
    this.messages.push({
      sender: 'me',
      content: this.newMessage,
      timestamp: new Date() // Capture current time as the timestamp
    });
    this.newMessage = ''; // Clear input field
  }
}
}

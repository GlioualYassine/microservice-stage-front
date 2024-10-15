import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
import { WebSocketResponse } from '../models/WebSocketResponse';
import { MessageResponse } from '../models/MessageResponse';
import { ApiResponse } from '../models/ApiResponse';
import { Subscription } from 'rxjs';
import { StompService } from '../services/stomp.service';
import { MessageSocketsService } from '../services/message.sockets.service';


@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    BrnDialogTriggerDirective,
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
    FormsModule
  ],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'] // Fixed typo in 'styleUrl'
})
export class ConversationComponent implements OnInit, OnDestroy {

  @Input() id!: any;
  @Input() username!: any;
  @Input() avatar!: any;
  @Input() status!: any;

  CurrentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  conversationId!: string;

  messages: MessageResponse[] = [];
  newMessage = '';
  stompConvSub: Subscription | undefined;

  constructor(
    private stompService: StompService,
    private conversationService: MessageSocketsService,
    private cdRef: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.conversationService.findConversationIdByUser1IdAndUser2ID(this.CurrentUser.id, this.id)
      .subscribe({
        next: (data: ApiResponse) => {
          this.conversationId = data.data;
          this.subscribeToConversation();  // Subscribe after the conversationId is set
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  ngOnDestroy() {
    this.stompConvSub?.unsubscribe();
  }

  // Subscribe to WebSocket for the conversation
  private subscribeToConversation() {
    if (!this.conversationId) return;

    // Subscribe to real-time messages
    this.stompConvSub = this.stompService.subscribe(`conv/${this.conversationId}`)
      .subscribe((payload: WebSocketResponse) => {
        if (payload.type === 'ALL') {
          // Load all initial messages
          this.messages = payload.data;
        } else if (payload.type === 'ADDED') {
          // Add new incoming message
          const newMessage: MessageResponse = payload.data;
          this.messages.push(newMessage);
          this.cdRef.detectChanges();  // Manually trigger change detection
        }
      });

    // Notify that the user is connected to the conversation
    this.stompService.send('conv', this.conversationId);
  }

  // Send a new message
  sendMessage() {
    if (this.newMessage.trim()) {
      const messageRequest = {
        conversationId: this.conversationId,
        senderId: this.CurrentUser.id,
        receiverId: this.id,
        message: this.newMessage.trim(),
        timestamp: new Date(),
      };
      this.stompService.send('sendMessage', messageRequest);
      this.newMessage = ''; // Clear the input field after sending
    }
  }
}

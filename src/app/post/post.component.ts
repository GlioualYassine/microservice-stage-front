import { Component, OnInit } from '@angular/core';
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
import { AvatarComponent } from '../avatar/avatar.component';
import {
  bootstrapThreeDotsVertical,
  bootstrapHeart,
  bootstrapShare,
} from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { octComment} from '@ng-icons/octicons'

import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';

import { NgIconComponent } from '@ng-icons/core';
import { PostResponse } from '../models/PostResponse';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    BrnCommandImports,
    HlmCommandImports,
    BrnSeparatorComponent,
    CommonModule,
    HlmSeparatorDirective,
    NgIconComponent,
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
    AvatarComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers: [provideIcons({ bootstrapThreeDotsVertical, bootstrapHeart,bootstrapShare ,octComment})],
})
export class PostComponent implements OnInit {

  posts: PostResponse[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        this.posts = response;
        
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

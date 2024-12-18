import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { FeedComponent } from "../feed/feed.component";
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { octHome,octPerson,octCommentDiscussion,octBell,octSignOut,octGear,octPersonAdd} from '@ng-icons/octicons'
import { heroUserPlus} from '@ng-icons/heroicons/outline'

import { NgIconComponent } from '@ng-icons/core';
import { LeftSideBarComponent } from "../left-side-bar/left-side-bar.component";


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [PostComponent, FeedComponent, NgIconComponent, LeftSideBarComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  providers: [provideIcons({octHome,octPerson,octCommentDiscussion,octBell,octSignOut ,octGear,heroUserPlus,octPersonAdd})],

})
export class MainContentComponent {

}

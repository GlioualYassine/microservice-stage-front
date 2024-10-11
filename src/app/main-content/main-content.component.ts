import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { FeedComponent } from "../feed/feed.component";
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { octHome,octPerson,octCommentDiscussion,octBell,octSignOut,octGear} from '@ng-icons/octicons'

import { NgIconComponent } from '@ng-icons/core';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [PostComponent, FeedComponent,NgIconComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  providers: [provideIcons({octHome,octPerson,octCommentDiscussion,octBell,octSignOut ,octGear})],

})
export class MainContentComponent {

}

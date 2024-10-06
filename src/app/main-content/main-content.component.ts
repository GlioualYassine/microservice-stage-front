import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { FeedComponent } from "../feed/feed.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [PostComponent, FeedComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}

import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { NewPostComponent } from "../new-post/new-post.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PostComponent, NewPostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostResponse } from '../models/PostResponse';
import { PostComponent } from '../post/post.component';
import { MypostsItemComponent } from "../myposts-item/myposts-item.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostComponent, MypostsItemComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  posts : PostResponse[] = [];
  constructor(private postService : PostService) { }
  ngOnInit(): void {
    this.postService.getPostsByUserId(this.currentUser.id).subscribe({
      next: (data) => {
        this.posts = data;
        this.posts = this.sortPostsDescending(this.posts);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  sortPostsDescending(posts: PostResponse[]): PostResponse[] {
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  isDialogOpen = false;

  // Aperçu de quelques amis (max 2-3)
  friendsPreview = [
    { name: 'Alice Dupont' },
    { name: 'Jean Martin' }
  ];

  // Liste complète des amis
  friends = [
    { name: 'Alice Dupont' },
    { name: 'Jean Martin' },
    { name: 'Marie Curie' },
    { name: 'Albert Dupuis' },
    { name: 'Claude Monet' }
  ];

  // Ouvre le dialog
  openDialog() {
    this.isDialogOpen = true;
  }

  // Ferme le dialog
  closeDialog() {
    this.isDialogOpen = false;
  }
}

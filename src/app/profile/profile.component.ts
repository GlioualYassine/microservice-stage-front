import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostResponse } from '../models/PostResponse';
import { PostComponent } from '../post/post.component';
import { MypostsItemComponent } from "../myposts-item/myposts-item.component";
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { UserService } from '../services/user.service';
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostComponent, MypostsItemComponent, EditprofileComponent, AvatarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  posts : PostResponse[] = [];
  friends : any = []; 
  constructor(private postService : PostService , private userService  : UserService) { }
  ngOnInit(): void {
    this.loadUserData();
    this.loadUserFriend();
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

  loadUserData() {
    this.userService.getUserById(this.currentUser.id).subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(this.currentUser);
      },
      error: (error) => {
        console.error(
          'Erreur lors du chargement des données utilisateur',
          error
        );
      },
    });
  }
  loadUserFriend() {
    this.userService.getUserFriendList(this.currentUser.id).subscribe({
      next: (data : any) => {
        this.friends = data.friends;
        console.log(this.friends);
        this.friendsPreview = this.friends.slice(0,3);
      },
      error: (error) => {
        console.error(
          'Erreur lors du chargement des données utilisateur',
          error
        );
      },
    });
  }

  sortPostsDescending(posts: PostResponse[]): PostResponse[] {
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  isDialogOpen = false;

  // Aperçu de quelques amis (max 2-3)
  friendsPreview : any [] = [];

  // Liste complète des amis
  friend2s = [
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


  isEditing = false;

  editProfile() {
    this.isEditing = true;
  }

  closeEditProfile() {
    this.isEditing = false;
  }
}

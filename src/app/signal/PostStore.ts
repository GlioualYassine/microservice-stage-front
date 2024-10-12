import { Injectable, signal } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostResponse } from '../models/PostResponse';
import { PostRequest } from '../models/PostRequest';

@Injectable({
  providedIn: 'root',
})
export class PostStore {
  // Signal pour stocker la liste des posts
  posts = signal<PostResponse[]>([]);

  constructor(private postService: PostService) {
    this.loadPosts();
  }

  async loadPosts() {
    try {
      const posts = await new Promise<PostResponse[]>((resolve, reject) => {
        this.postService.getAllPosts();
        resolve([]); // Vous devez adapter ici en fonction de ce que vous souhaitez
      });
      
      this.posts.set(posts);
    } catch (error) {
      console.error('Erreur lors du chargement des posts', error);
    }
  }
  

  // Ajouter un post et mettre à jour le signal en temps réel
  addPost(postData: PostRequest) {
    this.postService.createPost(postData).subscribe((newPost: PostResponse) => {
        console.log("newPost",newPost)
        this.posts.update((currentPosts) => [newPost, ...currentPosts]);
    });
  }

  // Supprimer un post et mettre à jour le signal
  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.posts.update((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId)
      );
    });
  }

  // Mettre à jour un post et le refléter dans la liste des posts
  updatePost(postId: string, postData: PostResponse) {
    this.postService
      .updatePost(postId, postData)
      .subscribe((updatedPost: PostResponse) => {
        this.posts.update((currentPosts) => {
          return currentPosts.map((post) =>
            post.id === postId ? updatedPost : post
          );
        });
      });
  }
}

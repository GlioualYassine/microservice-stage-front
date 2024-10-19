import { Component, effect, Input, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
  HlmCardDescriptionDirective,
} from '@spartan-ng/ui-card-helm';

import {
  BrnPopoverComponent,
  BrnPopoverTriggerDirective,
  BrnPopoverContentDirective,
} from '@spartan-ng/ui-popover-brain';

import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { NgIconComponent } from '@ng-icons/core';
import { PostResponse, CommentResponse } from '../models/PostResponse';
import { PostService } from '../services/post.service';
import { PostStore } from '../signal/PostStore';

import {
  bootstrapThreeDotsVertical,
  bootstrapHeart,
  bootstrapShare,
} from '@ng-icons/bootstrap-icons';
import { octComment } from '@ng-icons/octicons';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommentRequest } from '../models/CommentRequest';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-myposts-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmIconComponent,
    NgIconComponent,
    AvatarComponent,
  ],
  providers: [
    provideIcons({
      bootstrapThreeDotsVertical,
      bootstrapHeart,
      bootstrapShare,
      octComment,
    }),
  ],
  templateUrl: './myposts-item.component.html',
  styleUrl: './myposts-item.component.css',
})
export class MypostsItemComponent {
  @Input() posts: PostResponse[] = [];
  User: any = JSON.parse(localStorage.getItem('user') || '{}');
  newComment: string = '';
  currentPost: PostResponse | null = null;
  showCommentsMap = new Map<string, boolean>(); // Map pour l'état d'affichage des commentaires

  editingCommentId: string | null = null; // To track which comment is being edited
  commentEditContent: string = ''; // To hold the edited comment content

  openMenuPostId: string | null = null; // Track which post menu is open
  newContent: string = ''; // Store edited content
  editingPost: PostResponse | null = null; // Track the post being edited

  // likes logic
  userLikesMap = new Map<string, boolean>(); // Stocke si l'utilisateur a liké chaque post

  // Vérifier si l'utilisateur a déjà liké chaque post et remplir la Map
  initUserLikesMap() {
    this.posts.forEach((post) => {
      const hasLiked = this.hasLiked(post);
      this.userLikesMap.set(post.id, hasLiked);
    });
  }

  constructor(
    private postService: PostService,
    private postStore: PostStore,
    private commentService: CommentService,
    private likeService: LikeService // Injection du LikeService
  ) {
    effect(() => {
      this.posts = this.sortPostsDescending(this.posts);
      //console.log('Posts mis à jour :', this.posts);
      this.posts.forEach((post) => {
        post.comments = this.sortCommentsDescending(post.comments);
      });
    });
  }

  // Fonction pour trier les post en ordre décroissant
  sortPostsDescending(posts: PostResponse[]): PostResponse[] {
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  // Fonction pour trier les commentaires en ordre décroissant
  sortCommentsDescending(comments: CommentResponse[]): CommentResponse[] {
    return comments.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  // Vérifie si l'utilisateur courant est le même que l'utilisateur du commentaire
  isCurrentUser(commentUserId: string): boolean {
    return this.User && this.User.id === commentUserId;
  }
  ngOnInit(): void {
    //this.postStore.loadPosts();
    // Trier les commentaires pour chaque post après le chargement des posts
    this.posts.forEach((post) => {
      post.comments = this.sortCommentsDescending(post.comments);
    });

    // Initialiser la Map avec l'état des likes de l'utilisateur pour chaque post
    this.initUserLikesMap();
  }

  // Basculer l'affichage des commentaires pour un post spécifique
  toggleComments(postId: string) {
    const currentState = this.showCommentsMap.get(postId) || false;
    this.showCommentsMap.set(postId, !currentState);
  }

  // Ajouter un commentaire à un post
  addComment(post: PostResponse) {
    if (this.newComment.trim()) {
      const newComment: CommentRequest = {
        content: this.newComment,
        userId: this.User.id,
        postId: post.id,
        createdAt: new Date(),
      };
      let c: CommentResponse = {
        id: '',
        content: '',
        userId: '',
        createdAt: new Date(),
      };
      this.commentService.addComment(newComment).subscribe((comment) => {
        console.log('cc', comment);
        c.content = comment.content;
        c.id = comment.id;
        c.userId = comment.userId;
        c.createdAt = comment.createdAt;
        console.log('comment', c);
        post.comments.push(c);
        post.comments = this.sortCommentsDescending(post.comments);
      });

      this.newComment = '';
    }
  }

  // Méthode pour supprimer un commentaire
  deleteComment(post: PostResponse, comment: CommentResponse) {
    // Logique pour supprimer le commentaire
    this.commentService.deleteComment(comment.id).subscribe(() => {
      // Mettre à jour la liste des commentaires après suppression
      post.comments = post.comments.filter((c) => c.id !== comment.id);
    });
  }

  /*editComment(comment: CommentResponse) {
    this.editingCommentId = comment.id; // Set the ID of the comment being edited
    this.commentEditContent = comment.content; // Populate the input with the current content
  }*/

  // Function to update a comment
  updateComment(post: PostResponse, comment: CommentResponse) {
    if (this.commentEditContent.trim()) {
      const updatedComment: CommentRequest = {
        content: this.commentEditContent,
        userId: this.User.id,
        postId: post.id,
        createdAt: new Date(),
      };

      this.commentService
        .updateComment(comment.id, updatedComment)
        .subscribe((response) => {
          // Update the comment locally
          console.log('response', response);
          comment.content = response.content;
          comment.createdAt = response.createdAt;
          this.editingCommentId = null; // Clear the editing ID after updating
          this.commentEditContent = ''; // Clear the input
        });
    }
  }

  // Toggle the visibility of the post menu
  togglePostMenu(postId: string) {
    this.openMenuPostId = this.openMenuPostId === postId ? null : postId;
  }

  // Check if a menu is open for a specific post
  isPostMenuOpen(postId: string): boolean {
    return this.openMenuPostId === postId;
  }
  // Handle post edit
  editPost(post: PostResponse) {
    this.editingPost = { ...post }; // Clone post to edit
    this.newContent = post.content; // Pre-fill the content
    this.openMenuPostId = null; // Close the menu
  }

  // Save the edited post
  savePost(post: PostResponse) {
    if (this.newContent.trim()) {
      post.content = this.newContent.trim();

      let editedPost: PostResponse = {
        id: post.id,
        content: post.content,
        user: post.user,
        comments: post.comments,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: new Date().toISOString(),
        image: post.image,
      };

      this.postService.updatePost(post.id, editedPost).subscribe(() => {
        this.editingPost = null;
        this.newContent = '';
      });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.editingPost = null;
  }

  // Delete a post
  deletePost(post: PostResponse) {
    this.postService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    });
  }

  // Vérifier si les commentaires sont affichés pour un post donné
  areCommentsVisible(postId: string): boolean {
    return this.showCommentsMap.get(postId) || false;
  }

  // Ouvrir le dialog pour afficher tous les commentaires
  openCommentDialog(post: PostResponse) {
    this.currentPost = post;
  }

  // Fermer le dialog
  closeDialog() {
    this.currentPost = null;
  }

  // Utiliser trackBy pour améliorer les performances lors du rendu de la liste des commentaires
  trackByCommentId(index: number, comment: CommentResponse): string {
    return comment.id;
  }

  // Gestion des likes
  toggleLike(post: PostResponse) {
    const existingLike = post.likes.find(
      (like) => like.userId === this.User.id
    );
  
    if (existingLike) {
      // Si l'utilisateur a déjà liké, on supprime le like
      this.likeService.removeLike(existingLike.id).subscribe(() => {
        post.likes = post.likes.filter((like) => like.id !== existingLike.id);
        this.userLikesMap.set(post.id, false); // Mettre à jour l'état du like
      });
    } else {
      // Si l'utilisateur n'a pas encore liké, on ajoute un like
      const likeRequest = { userId: this.User.id, postId: post.id };
      this.likeService.addLike(likeRequest).subscribe((newLike) => {
        post.likes.push(newLike);
        this.userLikesMap.set(post.id, true); // Mettre à jour l'état du like
      });
    }
  }
  
  // Vérifier si l'utilisateur a liké un post en utilisant la Map
  hasLiked(post: PostResponse): boolean {
    return this.userLikesMap.get(post.id) || false;
  }
}

import { Component, effect, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
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
})
export class PostComponent implements OnInit {
  posts: PostResponse[] = [];
  User: any = JSON.parse(localStorage.getItem('user') || '{}');
  newComment: string = '';
  currentPost: PostResponse | null = null;
  showCommentsMap = new Map<string, boolean>(); // Map pour l'état d'affichage des commentaires

  constructor(
    private postService: PostService,
    private postStore: PostStore,
    private commentService: CommentService
  ) {
    effect(() => {
      this.posts = this.postStore.posts();
      //console.log('Posts mis à jour :', this.posts);
      this.posts.forEach((post) => {
        post.comments = this.sortCommentsDescending(post.comments);
      });
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
      post.comments = post.comments.filter(c => c.id !== comment.id);
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
}

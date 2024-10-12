import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommentResponse, PostResponse } from '../models/PostResponse';
import { PostRequest } from '../models/PostRequest';
import { CommentRequest } from '../models/CommentRequest';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:8589/api/v1/comments';

  constructor(private http: HttpClient) {}

  // Récupérer tous les posts depuis le backend
  getAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiUrl);
  }

  // Créer un post
  addComment(commentData: CommentRequest): Observable<CommentResponse> {
    const formData = new FormData();
    formData.append('content', commentData.content);
    formData.append('userId', commentData.userId);
    formData.append('postId', commentData.postId);

    return this.http.post<CommentResponse>(this.apiUrl, formData);
  }

  // Supprimer un post
  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }

  // Mettre à jour un post
  updateComment(postId: string, commentData: CommentRequest): Observable<CommentResponse> {
    const formData = new FormData();
    formData.append('content', commentData.content);
    return this.http.put<CommentResponse>(`${this.apiUrl}/${postId}`, formData);
  }
}

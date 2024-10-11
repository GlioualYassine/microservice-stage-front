import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8589/api/v1/posts';

  constructor(private http: HttpClient) {}

  // Créer un post
  createPost(postData: PostResponse): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('content', postData.content);
    formData.append('userId', postData.user.id.toString());

    if (postData.image) {
      formData.append('file', postData.image);
    }

    return this.http.post<PostResponse>(this.apiUrl, formData);
  }

  // Récupérer tous les posts
  getAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiUrl);
  }

  // Mettre à jour un post
  updatePost(postId: string, postData: PostResponse): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('content', postData.content);
    formData.append('userId', postData.user.id.toString());

    if (postData.image) {
      formData.append('file', postData.image);
    }

    return this.http.put<PostResponse>(`${this.apiUrl}/${postId}`, formData);
  }

  // Supprimer un post
  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }
}

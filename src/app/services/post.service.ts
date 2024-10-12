import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PostResponse } from '../models/PostResponse';
import { PostRequest } from '../models/PostRequest';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8589/api/v1/posts';

  // BehaviorSubject pour gérer la liste des posts
  private postsSubject = new BehaviorSubject<PostResponse[]>([]);
  posts$ = this.postsSubject.asObservable(); // Observable pour les composants

  constructor(private http: HttpClient) {}

  // Récupérer tous les posts depuis le backend et mettre à jour le BehaviorSubject
  getAllPosts(): void {
    this.http.get<PostResponse[]>(this.apiUrl).subscribe((posts) => {
      this.postsSubject.next(posts); // Met à jour le BehaviorSubject avec la liste des posts
    });
  }

  // Créer un post et mettre à jour le BehaviorSubject après l'ajout
  createPost(postData: PostRequest): Observable<PostResponse> {
    const formData = new FormData();
    formData.append('content', postData.content);
    formData.append('userId', postData.userId);

    if (postData.image) {
      formData.append('file', postData.image);
    }

    return this.http.post<PostResponse>(this.apiUrl, formData).pipe(
      tap((newPost: PostResponse) => {
        const currentPosts = this.postsSubject.value; // Récupère la liste actuelle des posts
        this.postsSubject.next([...currentPosts, newPost]); // Ajoute le nouveau post
      })
    );
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

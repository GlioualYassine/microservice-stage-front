// src/app/services/like.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LikeRequest } from '../models/LikeRequest';
import { LikeResponse } from '../models/PostResponse';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private apiUrl = 'http://localhost:8589/api/v1/likes'; // URL du backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les likes d'un post
  getLikesByPost(postId: string): Observable<LikeResponse[]> {
    return this.http.get<LikeResponse[]>(`${this.apiUrl}/post/${postId}`);
  }

  // Ajouter un like à un post
  addLike(likeData: LikeRequest): Observable<LikeResponse> {
    const formData = new FormData();
    formData.append('userId', likeData.userId);
    formData.append('postId', likeData.postId);

    return this.http.post<LikeResponse>(this.apiUrl, formData);
  }

  // Supprimer un like d'un post
  removeLike(likeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${likeId}`);
  }
}

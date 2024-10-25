import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserResponse } from "../models/UserResponse";
@Injectable({
    providedIn: 'root'
})

export class UserService{
    private apiUrl = 'http://localhost:8589/api/v1/users';

    constructor(private http: HttpClient) {}

    // Récupérer tous les posts depuis le backend
    getAllUsers(id : string): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.apiUrl+`/all/${id}`);
    }

    getUserFriendList(id : string): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl+`/friends/${id}`);
    }

    getUserById(id : string): Observable<any> {
        return this.http.get<any>(this.apiUrl+`/${id}`);
    }

    updateUser(id: string, formData: FormData): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
      }
    
    
}
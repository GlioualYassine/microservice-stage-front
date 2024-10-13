import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { UserFriendsResponseList } from '../models/UserFriendsResponseList';

@Injectable({
  providedIn: 'root',
})
export class friendshipsService {
  private apiUrl = 'http://localhost:8589/api/v1/friendships';

  constructor(private http: HttpClient) {}

  sendFriendRequest(
    friendshipData: FriendshipRequest
  ): Observable<string> {
    const formData = new FormData();
    formData.append('fromUserId', friendshipData.userFromId);
    formData.append('toUserId', friendshipData.userToId);
    return this.http.post<string>(this.apiUrl+"/request", formData);
  }

  cancelSentFriendRequest(fromUserId : string,  toUserId : string) : Observable<any>{
    return this.http.get<any>(this.apiUrl+"/request/"+fromUserId+"/"+toUserId+"/cancel");
  }

  AcceptFriendRequest(
    friendshipData: FriendshipRequest
  ): Observable<string> {
    const formData = new FormData();
    formData.append('fromUserId', friendshipData.userFromId);
    formData.append('toUserId', friendshipData.userToId);
    return this.http.post<string>(this.apiUrl+"/accept", formData);
  }

  GetFriendRequests( userId: string): Observable<UserFriendsResponseList[]> {
    return this.http.get<UserFriendsResponseList[]>(this.apiUrl+"/requests/"+userId);
  }

  GetUsersFriends( userId: string): Observable<UserFriendsResponseList[]> {
    let url : string = "http://localhost:8589/api/v1/users"
    return this.http.get<UserFriendsResponseList[]>(url+"/friends/"+userId);
  }

  checkExistingFriendRequest( fromUserId : string,  toUserId : string): Observable<boolean> {
    let url : string = "http://localhost:8589/api/v1/friendships"
    return this.http.get<boolean>(url+"/request/"+fromUserId+"/"+toUserId);
  }


  
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/ApiResponse";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MessageSocketsService {
    private apiUrl = 'http://localhost:8090/';
    constructor( private http : HttpClient){}

    findConversationIdByUser1IdAndUser2ID(userId1 : string, user2Id : string): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('user1Id', userId1);
        formData.append('user2Id', user2Id);
        return this.http.post<ApiResponse>(this.apiUrl+`user/conversation/id`, formData);
    }

}
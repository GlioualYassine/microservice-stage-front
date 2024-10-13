import { FriendModel } from "./FriendModel"

export interface UserFriendsResponseList {
    id : string 
    username : string 
    friends : FriendModel[]
}
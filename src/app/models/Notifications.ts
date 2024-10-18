export interface Notification{
    id : string 
    senderId : string
    senderName : string
    receiverId : string
    receiverName : string
    message : string
    isRead : boolean
    createdAt :Date
    NotificationType : string
}
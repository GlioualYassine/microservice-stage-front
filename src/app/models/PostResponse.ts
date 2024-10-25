export interface PostResponse {
    id: string;
    content: string;
    user: any
    comments: CommentResponse[];
    likes:  LikeResponse[];
    createdAt: string;
    updatedAt: string;
    image?: string; // Base64 string ou URL de l'image
  }
  

  export interface CommentResponse {
     id : string
     content : string,
     userId : any ,
     createdAt : Date
  }

  export interface LikeResponse {
    id : string
    userId : any
    createdAt : Date
  }
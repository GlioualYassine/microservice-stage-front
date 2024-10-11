export interface Post {
    content: string;
    userId: string; // UUID sous forme de string
    file?: File; // Fichier uploadé (optionnel)
  }
  
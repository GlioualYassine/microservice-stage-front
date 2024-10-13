
export interface UserResponse {
  id: string;  // UUID de l'utilisateur
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio?: string;  // Optionnel
  birthDate?: Date;  // Optionnel
  createdAt: Date;
  updatedAt: Date;
  friends: string[];  // Liste d'UUIDs des amis
}

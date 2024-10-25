import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  @Input() currentUser: any;
  editProfileForm!: FormGroup;
  @Output() close = new EventEmitter<void>(); // Emmet un événement pour fermer le popup

  selectedImage: File | null = null; // Pour stocker l'image sélectionnée
  imageUrl: string = ''; // Lien de l'image actuelle de l'utilisateur

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Initialise le formulaire vide au début
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      birthDate: ['', Validators.required],
      image: [null], // Champ pour l'image
    });

    this.editProfileForm.patchValue({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      username: this.currentUser.username,
      email: this.currentUser.email,
      bio: this.currentUser.bio,
      birthDate: this.currentUser.birthDate
        ? new Date(this.currentUser.birthDate)
        : null, // Convert to Date object
    });
    // Charger l'image actuelle ou une image par défaut
    this.imageUrl =
      this.currentUser.imageUrl || '';

      console.log("test image ",this.imageUrl);
    // Charger les données de l'utilisateur actuel
    //this.loadUserData();
  }

  
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];

      // Use FileReader to convert the image to base64
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // The base64 encoded image is here
        console.log("imge selected " , this.imageUrl);
      };
      reader.readAsDataURL(this.selectedImage); // Read the file as Data URL
    }
  }
  removeProfileImage(): void {
    this.selectedImage = null; // Réinitialiser l'image sélectionnée
    this.imageUrl = '';
  }
  onSubmit() {
    const formData = new FormData();

    console.log('etette');
    // Ajouter les données du formulaire à FormData
    Object.keys(this.editProfileForm.value).forEach((key) => {
      let value = this.editProfileForm.value[key];

      // Format birthDate to 'yyyy-MM-dd'
      if (key === 'birthDate' && value instanceof Date) {
        value = value.toISOString().split('T')[0]; // Convert Date to 'yyyy-MM-dd'
      }

      formData.append(key, value); // Append other values
    });

    // Si une image est sélectionnée, l'ajouter à FormData, sinon ajouter une image par défaut
    if (this.selectedImage) {
      formData.append('file', this.selectedImage); // Ajouter l'image sélectionnée
    } else {
      // Utiliser l'image de profil par défaut
      const defaultImagePath = 'assets/images/default_profile.png';

      // Vous devez convertir cette image en Blob avant de l'envoyer à FormData
      fetch(defaultImagePath)
        .then((response) => response.blob())
        .then((blob) => {
          formData.append('file', blob, 'default_profile.png'); // Ajouter l'image par défaut
          // Appeler le service pour mettre à jour l'utilisateur avec l'image par défaut
          this.sendUpdateRequest(formData);
        })
        .catch((error) =>
          console.error(
            "Erreur lors du chargement de l'image par défaut",
            error
          )
        );

      return;
    }
    // Si une image est sélectionnée, continuez à soumettre immédiatement
    this.sendUpdateRequest(formData);
  }

  // Fonction séparée pour envoyer la requête de mise à jour
  sendUpdateRequest(formData: FormData) {
    console.log('inside sendUpdateRequest');
    this.userService.updateUser(this.currentUser.id, formData).subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour avec succès', response);
        this.close.emit(); // Ferme la popup lorsqu'on annule
      },
      error: (error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
      },
    });
  }

  onCancel() {
    // Logique pour annuler l'édition (par exemple masquer le formulaire)
    console.log('Edit cancelled');
    this.close.emit(); // Ferme la popup lorsqu'on annule
  }
}

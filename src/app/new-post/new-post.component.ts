import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { PostResponse } from '../models/PostResponse';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
  providers: [],
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup;
  selectedImage: File | null = null;
  isDialogOpen: boolean = false;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
      image: [null]
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id || !user.username || !user.email) {
      console.error('User data is missing');
      return;
    }

    const postData: PostResponse = {
      id: UUID.UUID(), // Assure-toi d'ajouter un ID unique
      content: this.postForm.value.content,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      comments: [],
      likes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      image: this.selectedImage ? this.selectedImage.name : undefined // Gérer l'image
    };

    this.postService.createPost(postData).subscribe({
      next: (response: any) => {
        console.log('Post créé avec succès !', response);
        this.successMessage = 'Post créé avec succès !';
        this.isDialogOpen = false;
        this.postForm.reset();
        this.selectedImage = null;
      },
      error: (error: any) => {
        console.error('Erreur lors de la création du post', error);
      }
    });
  }

  openDialog() {
    this.isDialogOpen = true;
    this.successMessage = '';
  }

  onCancel() {
    this.postForm.reset();
    this.isDialogOpen = false;
  }
}

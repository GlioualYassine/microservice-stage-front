import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { PostResponse } from '../models/PostResponse';
import { UUID } from 'angular2-uuid';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { PostRequest } from '../models/PostRequest';
import { PostStore } from '../signal/PostStore';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
  providers: [],
  imports: [ReactiveFormsModule, AvatarComponent, CommonModule],
})
export class 
NewPostComponent implements OnInit {
  postForm!: FormGroup;
  selectedImage: File | null = null;
  isDialogOpen: boolean = false;
  successMessage: string = '';
  user : any ; 
  constructor(private fb: FormBuilder, private postService: PostService , private postStore : PostStore , private userService : UserService) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
      image: [null],
    });

    this.userService.getUserById(JSON.parse(localStorage.getItem('user') || '{}').id).subscribe({
      next: (response) => {
        this.user = response;
      }
    })
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
    const postData: PostRequest = {
      content: this.postForm.value.content,
      userId: user.id,
      image: this.selectedImage,
    };

   // Utiliser le PostStore pour créer un nouveau post
   this.postStore.addPost(postData);

   // Réinitialiser le formulaire et fermer la boîte de dialogue
   this.successMessage = 'Post créé avec succès !';
   this.postForm.reset();
   this.selectedImage = null;
   this.isDialogOpen = false;
  }

  openDialog() {
    this.isDialogOpen = true;
    this.successMessage = '';
  }

  onCancel() {
    this.postForm.reset();
    this.isDialogOpen = false;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}

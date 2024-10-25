import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Remplace par ton propre service AuthService
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import du ReactiveFormsModule

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { AlertService } from '../services/alert.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    CommonModule,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    ReactiveFormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
  ],
  host: {
    class: 'block w-full max-w-lg',
  },
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService, // Inject the AlertService,
    private appComponent: AppComponent // Injection du composant parent pour gérer l'alerte


  ) {}

  ngOnInit(): void {
   

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Méthode pour gérer la soumission du formulaire de register
  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.alertService.setAlert('Success! Please check your email to activate your account.', 'success');
          this.router.navigate(['/login']); // Redirection après inscription
        },
        (error) => {
          console.error('Registration error', error);
          this.alertService.setAlert('Registration failed. Please try again.', 'danger');
        }
      );
    } else {
      this.alertService.setAlert('Please fill in the form correctly.', 'warning');
    }
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}

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
import { AppComponent } from '../app.component';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appComponent : AppComponent,
    private alertService : AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Méthode pour gérer la soumission du formulaire de login
  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.data.token); // Stockage du token dans le localStorage
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Stockage de l'utilisateur dans le localStorage
          this.router.navigate(['/home']); // Redirection après le login
        },
        (error) => {
          console.error('Login error', error.error);
          if(error.error.buisnessErrorCode == 303){
          //  this.appComponent.showAlert('Account not activated! Please check your email to activate your account.'); // Afficher l'alerte
            this.alertService.setAlert('Account not activated! Please check your email to activate your account.', 'danger');

          }
          else
           // this.appComponent.showAlert('Login failed! Please check your credentials.'); // Afficher l'alerte
            this.alertService.setAlert('Login failed! Please check your credentials.', 'danger');

        }
      );
    }
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}

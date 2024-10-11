import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [HlmSpinnerComponent, CommonModule, RouterModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css',
})
export class ActivateAccountComponent implements OnInit {
  token: string | null = null;
  isActivated: boolean = false;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Retrieve the token using queryParams observable
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      console.log('Token:', this.token);

      // If token exists, call the activateAccount method from AuthService
      if (this.token) {
        this.authService.activateAccount(this.token).subscribe({
          next: (response) => {
            this.isActivated = true;
            console.log(response);
          },
          error: (error) => {
            this.hasError = true;
            console.error(error);
          },
        });
      } else {
        this.hasError = true; // In case there is no token
      }
    });
  }
}

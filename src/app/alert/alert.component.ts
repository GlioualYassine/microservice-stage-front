import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div *ngIf="message" [ngClass]="getAlertClass()" class="alert">
      {{ message }}
    </div>
  `,
  imports: [CommonModule],
  styles: [
    `
      .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
      }

      /* Different alert types */
      .alert-success {
        background-color: #4caf50; /* Green */
      }

      .alert-danger {
        background-color: #f44336; /* Red */
      }

      .alert-warning {
        background-color: #ff9800; /* Orange */
      }

      .alert-info {
        background-color: #2196f3; /* Blue */
      }
    `,
  ],
})
export class AlertComponent implements OnInit {
  @Input() show = false; // Par défaut, l'alerte est masquée
  @Input() message = ''; // Message d'alerte à afficher
  @Input() type = 'success'; // Type d'alerte (success, danger, warning, info), valeur par défaut : success

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert : any) => {
      this.message = alert.message;
      this.type = alert.type || 'success'; // Par défaut, le type est 'success'
      // Automatiquement masquer l'alerte après 5 secondes
      if (this.message) {
        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
    });
  }

  // Méthode pour retourner la classe CSS correspondant au type d'alerte
  getAlertClass() {
    switch (this.type) {
      case 'success':
        return 'alert-success';
      case 'danger':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-success'; // Par défaut, la classe de succès
    }
  }
}

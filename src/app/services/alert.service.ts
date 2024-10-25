import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{ message: string; type: string }>(
    { message: '', type: 'success' }
  );

  getAlert() {
    return this.alertSubject.asObservable();
  }

  // Fonction pour définir une alerte
  setAlert(
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info' = 'success'
  ) {
    this.alertSubject.next({ message, type });
  }
}

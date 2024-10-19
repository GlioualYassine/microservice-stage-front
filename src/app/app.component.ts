import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestComponent } from "./test/test.component";
import { HeaderComponent } from "./header/header.component";
import { RightSideBarComponent } from "./right-side-bar/right-side-bar.component";
import { MainContentComponent } from "./main-content/main-content.component";
import { HomeComponent } from "./home/home.component";
import { LeftSideBarComponent } from "./left-side-bar/left-side-bar.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, HomeComponent, LeftSideBarComponent, RightSideBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front';
  showSidebar: boolean = true;

  constructor(private router: Router){
    // Surveille les changements de route
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

   // Vérifie si on est sur la route "/login"
   private checkRoute(): void {
    this.showSidebar = this.router.url !== '/login';
  }
}

import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RightSideBarComponent } from "../right-side-bar/right-side-bar.component";
import { MainContentComponent } from "../main-content/main-content.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RightSideBarComponent, MainContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

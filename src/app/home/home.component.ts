import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RightSideBarComponent } from "../right-side-bar/right-side-bar.component";
import { MainContentComponent } from "../main-content/main-content.component";
import { LeftSideBarComponent } from "../left-side-bar/left-side-bar.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RightSideBarComponent, MainContentComponent, LeftSideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

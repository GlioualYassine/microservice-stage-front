import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from "./test/test.component";
import { HeaderComponent } from "./header/header.component";
import { RightSideBarComponent } from "./right-side-bar/right-side-bar.component";
import { MainContentComponent } from "./main-content/main-content.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, HeaderComponent, RightSideBarComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front';
}

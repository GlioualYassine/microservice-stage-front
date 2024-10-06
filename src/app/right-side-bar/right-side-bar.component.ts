import { Component } from '@angular/core';
import { RightSideBarRoutesComponent } from "../right-side-bar-routes/right-side-bar-routes.component";

@Component({
  selector: 'app-right-side-bar',
  standalone: true,
  imports: [RightSideBarRoutesComponent],
  templateUrl: './right-side-bar.component.html',
  styleUrl: './right-side-bar.component.css'
})
export class RightSideBarComponent {

}

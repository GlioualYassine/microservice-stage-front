import { Component } from '@angular/core';
import { LeftSideBarComponent } from "../left-side-bar/left-side-bar.component";
import { NotifItemComponent } from "../notif-item/notif-item.component";

@Component({
  selector: 'app-notif',
  standalone: true,
  imports: [LeftSideBarComponent, NotifItemComponent],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.css'
})
export class NotifComponent {

}

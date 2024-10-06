import { Component } from '@angular/core';
import { sideBarData } from '../data/sidebar.data';
import { CommonModule } from '@angular/common';
import { RightSideBarItemComponent } from "../right-side-bar-item/right-side-bar-item.component";
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';

@Component({
  selector: 'app-right-side-bar-routes',
  standalone: true,
  imports: [RightSideBarItemComponent,CommonModule,HlmScrollAreaComponent],
  templateUrl: './right-side-bar-routes.component.html',
  styleUrl: './right-side-bar-routes.component.css'
})
export class RightSideBarRoutesComponent {
  friendList = sideBarData ;
}

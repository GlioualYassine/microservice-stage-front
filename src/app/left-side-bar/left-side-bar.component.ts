import { Component, OnInit } from '@angular/core';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import {
  octHome,
  octPerson,
  octCommentDiscussion,
  octBell,
  octSignOut,
  octGear,
  octPersonAdd,
} from '@ng-icons/octicons';
import { heroUserPlus } from '@ng-icons/heroicons/outline';

import { NgIconComponent } from '@ng-icons/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-left-side-bar',
  standalone: true,
  imports: [NgIconComponent,RouterModule],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css',
  providers: [
    provideIcons({
      octHome,
      octPerson,
      octCommentDiscussion,
      octBell,
      octSignOut,
      octGear,
      heroUserPlus,
      octPersonAdd,
    }),
  ],
})
export class LeftSideBarComponent implements OnInit {
  currentRoute: string = '';
  constructor(private router: Router) {}
  ngOnInit(): void {
    // Abonne-toi aux événements de navigation pour mettre à jour la route actuelle
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  // Méthode qui retourne true si la route actuelle correspond à celle passée en paramètre
  isRouteActive(route: string): boolean {
    
    return this.currentRoute === route;
  }
}

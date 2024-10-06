import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import {ionSearch  } from '@ng-icons/ionicons';
import {bootstrapBellFill  } from '@ng-icons/bootstrap-icons';

import { AvatarComponent } from '../avatar/avatar.component';
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmInputDirective, NgIconComponent, AvatarComponent, NotificationsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  viewProviders: [provideIcons({  heroUsers , ionSearch ,bootstrapBellFill })]
})
export class HeaderComponent {

}

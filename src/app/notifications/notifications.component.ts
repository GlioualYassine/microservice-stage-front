import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {bootstrapBellFill ,bootstrapPersonFillAdd } from '@ng-icons/bootstrap-icons';
import {
  lucideUserCircle,
  lucideLayers,
  lucideMessageSquare,
  lucideCode,
  lucideMail,
  lucideLogOut,
  lucideSmile,
  lucideCog,
  lucideGithub,
  lucideKeyboard,
  lucideUser,
  lucidePlus,
  lucidePlusCircle,
    lucideHelpCircle,
} from '@ng-icons/lucide';

import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';

import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
} from '@spartan-ng/ui-avatar-helm';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    NgIconComponent,
    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,
    HlmScrollAreaComponent,
    HlmButtonDirective,
    HlmIconComponent,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  viewProviders: [provideIcons({ bootstrapBellFill })],
  providers: [provideIcons({
    bootstrapPersonFillAdd,
    lucideUser,
    lucideLayers,
    lucideCog,
    lucideKeyboard,
    lucideUserCircle,
    lucideSmile,
    lucidePlus,
    lucideGithub,
    lucideHelpCircle,
    lucideCode,
    lucideLogOut,
    lucideMail,
    lucideMessageSquare,
    lucidePlusCircle,
  }),]
})
export class NotificationsComponent {

}

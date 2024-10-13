import { Component } from '@angular/core';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { octHome,octPerson,octCommentDiscussion,octBell,octSignOut,octGear,octPersonAdd} from '@ng-icons/octicons'
import { heroUserPlus} from '@ng-icons/heroicons/outline'

import { NgIconComponent } from '@ng-icons/core';
@Component({
  selector: 'app-left-side-bar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css',
  providers: [provideIcons({octHome,octPerson,octCommentDiscussion,octBell,octSignOut ,octGear,heroUserPlus,octPersonAdd})],

})
export class LeftSideBarComponent {

}

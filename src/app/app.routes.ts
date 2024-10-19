import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { FriendRequestSendComponent } from './friend-request-send/friend-request-send.component';
import { NotifComponent } from './notif/notif.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path:'login',
         component : LoginComponent,
        
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path:"activate-account",
        component: ActivateAccountComponent
    },
    {
        path:"friendRequests",
        component: FriendRequestSendComponent
    },
    {
        path:"notifications",
        component: NotifComponent
    },
    {
        path : "profile",
        component : ProfileComponent
    }
];

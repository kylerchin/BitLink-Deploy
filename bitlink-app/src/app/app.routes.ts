import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FollowingPostPageComponent } from './pages/following-post-page/following-post-page.component';
import { ForYouPageComponent } from './pages/for-you-page/for-you-page.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'notifications', component: NotificationPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'following-posts', component: FollowingPostPageComponent },
  { path: 'for-you', component: ForYouPageComponent },
  { path: 'messages', component: MessagePageComponent },
];

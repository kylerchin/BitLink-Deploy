import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'notifications', component: NotificationPageComponent },
  { path: 'post', component: PostPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent }
];
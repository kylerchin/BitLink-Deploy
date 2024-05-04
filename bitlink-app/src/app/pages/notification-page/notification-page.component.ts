import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NewNotificationComponent } from '../../components/new-notification/new-notification.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NewNotificationComponent,
    SidebarComponent,
    SearchBarComponent,
  ],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NotificationPageComponent {
  username: string = 'Ferris the Crab';
  username2: string = 'C++ Chef';
  usertag: string = '@RustyRustacean';
  usertag2: string = '@ChefCPP';
  profile_pic: string = 'assets/ferris-on-pattern.jpg';
  profile_pic2: string = 'assets/remy.jpg';
  action1: string = 'has liked your post "My experience with R coders..."';
  action2: string = 'has started following you.';
  action3: string =
    'has liked your post "Why C++ has changed my life forever..."';
  following: string = 'Following \u2713';
  followback: string = 'Follow back?';
}

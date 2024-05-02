import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NewNotificationComponent } from '../../components/new-notification/new-notification.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [NgOptimizedImage, NewNotificationComponent, SidebarComponent],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NotificationPageComponent {
  username: string = 'Ferris the Crab';
  usertag: string = '@RustyRustacean';
  profile_pic: string = 'assets/ferris-on-pattern.jpg';
  action: string = 'has liked your post "My experience with R coders...';
  action2: string = 'has started following you';
}

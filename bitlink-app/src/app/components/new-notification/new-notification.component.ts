import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-notification',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './new-notification.component.html',
  styleUrl: './new-notification.component.scss',
})
export class NewNotificationComponent {
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() action: string = '';
  @Input() profile_pic: string = '';
  @Input() following: string = '';
  @Input() followback: string = '';
}

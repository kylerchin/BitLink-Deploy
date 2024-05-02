import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-new-notification',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './new-notification.component.html',
  styleUrl: './new-notification.component.scss',
})
export class NewNotificationComponent {
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() action: string = '';
  @Input() profile_pic: string = '';
  @Input() action2: string = '';
}

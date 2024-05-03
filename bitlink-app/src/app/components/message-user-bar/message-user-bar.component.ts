import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-user-bar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './message-user-bar.component.html',
  styleUrl: './message-user-bar.component.scss'
})
export class MessageUserBarComponent {
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() action: string = '';
  @Input() profile_pic: string = '';
}

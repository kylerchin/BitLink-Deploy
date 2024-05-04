import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
  ],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() profile_pic: string = '';
}

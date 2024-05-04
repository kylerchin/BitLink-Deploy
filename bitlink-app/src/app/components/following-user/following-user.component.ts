import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-following-user',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './following-user.component.html',
  styleUrl: './following-user.component.scss'
})
export class FollowingUserComponent {
  isHovering: boolean = false;
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() action: string = '';
  @Input() profile_pic: string = '';
  @Input() following: string = '';
}

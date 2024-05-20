import { Component, Input, Output } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-following-user',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, HttpClientModule],
  templateUrl: './following-user.component.html',
  styleUrl: './following-user.component.scss'
})
export class FollowingUserComponent {
  constructor(private http: HttpClient) { }
  readonly APIUrl = "http://localhost:8888/api/account/unfollow";

  isHovering: boolean = false;
  @Output() unfollow = new EventEmitter<string>();
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() action: string = '';
  @Input() profile_pic: string = '';
  @Input() following: string = '';
  @Input() user_id: string = '';
  unfollowuser(id:any){
      this.unfollow.emit(id);
  }
}

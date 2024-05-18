import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-following-user',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, HttpClientModule],
  templateUrl: './following-user.component.html',
  styleUrl: './following-user.component.scss'
})
export class FollowingUserComponent {
  constructor(private http: HttpClient) { }
  readonly APIUrl = "http://localhost:4200/api/account/unfollow";

  isHovering: boolean = false;
  unfollowuser(id:any){
    this.http.delete(this.APIUrl+'?id='+id).subscribe(data => {
      alert(data);
    })
  }
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() action: string = '';
  @Input() profile_pic: string = '';
  @Input() following: string = '';
  @Input() user_id: string = '';
}

import { Component, ViewEncapsulation, EventEmitter } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FollowingUserComponent } from '../../components/following-user/following-user.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NewNotificationComponent } from '../../components/new-notification/new-notification.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface FollowingArray {
  user_id: string;
  username: string;
  usertag: string;
  profile_pic: string;
  following: string;
  time: string;
}

@Component({
  selector: 'app-following-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FollowingUserComponent,
    SidebarComponent,
    SearchBarComponent,
    NewNotificationComponent,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FollowingPageComponent {
  followinglist: FollowingArray[] = [];
  
  constructor(private http: HttpClient) { }

  fetchFollowingListInformation(): void {
    this.http.get<FollowingArray[]>('http://localhost:8888/api/account/following')
      .subscribe({
        next: (data) => {
          this.followinglist = data;
          const startDate = new Date(2020, 0, 1);
          const endDate = new Date();
          const dates = this.generateRandomDates(this.followinglist.length, startDate, endDate);
          dates.sort((a, b) => b.getTime() - a.getTime());
          for (let i = 0; i < this.followinglist.length; i++) {
            this.followinglist[i].following = 'Following \u2713';
            this.followinglist[i].time = `Following Since ${dates[i].toLocaleDateString()}`;
          }
          for (let i = 0; i < this.followinglist.length; i++) {
            if (!this.followinglist[i].usertag.startsWith('@')) {
                this.followinglist[i].usertag = '@' + this.followinglist[i].usertag;
            }
          }
        
        },
        error: (error) => {
          console.error("Error fetching user information:", error);
        }
      });
  }

  ngOnInit(): void {
    this.fetchFollowingListInformation();
  }

  getRandomDate(startDate: Date, endDate: Date): Date {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const randomTime = new Date(start + Math.random() * (end - start));
    return randomTime;
  }

  generateRandomDates(count: number, startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < count; i++) {
      dates.push(this.getRandomDate(startDate, endDate));
    }
    return dates;
  }

  readonly APIUrl = "http://localhost:8888/api/account/unfollow";
  handleUnfollow(id:any){
    this.http.delete(this.APIUrl+'?id='+id).subscribe({
      next: (data) => {
        alert(data);
        this.fetchFollowingListInformation();
      },
      error: (error) => {
        console.error("Error unfollowing user:", error);
        this.fetchFollowingListInformation();
      }
    } )
  }
}

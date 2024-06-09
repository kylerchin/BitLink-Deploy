import { Component, ViewEncapsulation, EventEmitter } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FollowingUserComponent } from '../../components/following-user/following-user.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NewNotificationComponent } from '../../components/new-notification/new-notification.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AccountManagementService } from '../../services/account-management/account-management.service';


interface FollowingArray {
  _id: string;
  username:string
  name: string;
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
    CommonModule,
    NgIf
  ],
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FollowingPageComponent {
  followinglist: FollowingArray[] = [];
  currentName : String | undefined;
  error: string | undefined;
  success: boolean | undefined;

  id: string = '"664a8e9008885a342d2837b4"';
  nameInput: string | undefined;
  usernameInput: string | undefined;
  emailInput: string | undefined;
  passwordInput: string | undefined;
  password2Input: string | undefined;

  constructor(private accountManagementService: AccountManagementService, private http: HttpClient) {
    this.nameInit();
  }

  nameInit() {
    this.accountManagementService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.id = JSON.parse(res)._id;
        this.currentName = JSON.parse(res).username;
        console.log(this.id);
        this.fetchFollowingListInformation(this.id)
      },
      error: (error) => {
        console.error("Error fetching current user information:", error);
      }
    });
  }


  fetchFollowingListInformation(userId: string): void {
    this.http.get<FollowingArray[]>(`http://localhost:8888/api/account/following?user_id=${userId}`)
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
          console.log(this.followinglist);
          for (let i = 0; i < this.followinglist.length; i++) {
            if (!this.followinglist[i].name.startsWith('@')) {
                this.followinglist[i].name = '@' + this.followinglist[i].name;
            }
          }
        },
        error: (error) => {
          console.error("Error fetching user information:", error);
        }
      });
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
    this.http.delete(this.APIUrl+'?id='+id+'&id2='+this.id).subscribe({
      next: (data) => {
        alert(data);
        this.fetchFollowingListInformation(this.id);
      },
      error: (error) => {
        console.error("Error unfollowing user:", error);
        this.fetchFollowingListInformation(this.id);
      }
    } )
  }

}

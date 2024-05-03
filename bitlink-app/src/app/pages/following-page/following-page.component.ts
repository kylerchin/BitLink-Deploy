import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FollowingUserComponent } from '../../components/following-user/following-user.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NewNotificationComponent } from '../../components/new-notification/new-notification.component';

@Component({
  selector: 'app-following-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FollowingUserComponent,
    SidebarComponent,
    SearchBarComponent,
    NewNotificationComponent,
  ],
  templateUrl: './following-page.component.html',
  styleUrl: './following-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FollowingPageComponent {
  username: string = 'Ferris the Crab';
  username2: string = 'C++ Chef';
  username3: string = 'XxEmo CoderxX';
  username4: string = 'Looking for Love';
  username5: string = 'Pineapple Under the Sea';
  username6: string = 'CS Coder';
  username7: string = 'LF GF';
  usertag: string = '@RustyRustacean';
  usertag2: string = '@ChefCPP';
  usertag3: string = '@SilkSongWhen';
  usertag4: string = '@LookingForBoyfriend';
  usertag5: string = '@RealSpongebob22';
  usertag6: string = '@CounterStrikePlayer';
  usertag7: string = '@NeedGFNow';
  profile_pic: string = 'assets/ferris-on-pattern.jpg';
  profile_pic2: string = 'assets/remy.jpg';
  profile_pic3: string = 'assets/cool-pfp.jpg';
  profile_pic4: string = 'assets/bw-female.jpg';
  profile_pic5: string = 'assets/sponge.jpg';
  profile_pic6: string = 'assets/sweating-mask.jpg';
  profile_pic7: string = 'assets/yada.jpg';
  action1: string = 'Following Since 05/03/2024';
  action3: string = 'Following Since 05/01/2024';
  action4: string = 'Following Since 04/22/2024';
  action6: string = 'Following Since 04/13/2024';
  action7: string = 'Following Since 03/05/2024';
  action2: string = 'Following Since 01/01/2024';
  action5: string = 'Following Since 04/20/1969';
  following: string = 'Following \u2713';
}

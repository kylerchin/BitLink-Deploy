import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MessageUserBarComponent } from '../../components/message-user-bar/message-user-bar.component'
import { NewMessageComponent } from '../../components/new-message/new-message.component';
import { MessageBoxComponent } from '../../components/message-box/message-box.component';
import { MessageTextBoxComponent } from '../../components/message-text-box/message-text-box.component';
import { TextMessageComponent } from '../../components/text-message/text-message.component';
import { SendMessageComponent } from '../../components/send-message/send-message.component';


@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    MessageUserBarComponent,
    NewMessageComponent,
    MessageBoxComponent,
    MessageTextBoxComponent,
    TextMessageComponent,
    SendMessageComponent,
  ],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MessagePageComponent {
  username: string = 'Ferris the Crab';
  username2: string = 'C++ Chef';
  username3: string = 'XxEmo CoderxX';
  username4: string = 'Looking for Love';
  username5: string = 'Pineapple Under the Sea';
  username6: string = 'CS Coder';
  username7: string = 'LF GF';
  username8: string = 'SMILE';
  username9: string = 'UWU';
  username10: string = 'ID WIN';
  usertag: string = '@RustyRustacean';
  usertag2: string = '@ChefCPP';
  usertag3: string = '@SilkSongWhen';
  usertag4: string = '@LookingForBoyfriend';
  usertag5: string = '@RealSpongebob22';
  usertag6: string = '@CounterStrikePlayer';
  usertag7: string = '@NeedGFNow';
  usertag8: string = '@SmileyCoder';
  usertag9: string = '@UWUCODE';
  usertag10: string = '@NahIdWin';
  profile_pic: string = 'assets/ferris-on-pattern.jpg';
  profile_pic2: string = 'assets/remy.jpg';
  profile_pic3: string = 'assets/cool-pfp.jpg';
  profile_pic4: string = 'assets/bw-female.jpg';
  profile_pic5: string = 'assets/sponge.jpg';
  profile_pic6: string = 'assets/sweating-mask.jpg';
  profile_pic7: string = 'assets/yada.jpg';
  profile_pic8: string = 'assets/smile.jpg';
  profile_pic9: string = 'assets/female.jpg';
  profile_pic10: string = 'assets/nahidwin.jpg';
  action1: string = 'seen 2 hours ago';
  action2: string = 'seen 5 hours ago';
  action3: string = 'seen 9 hours ago';
  action4: string = 'seen 3 hours ago';
  action5: string = 'seen 10 hours ago';
  action6: string = 'seen 5 minutes ago';
  action7: string = 'seen 9 minutes ago';
  action8: string = 'seen 3 minutes ago';
  action9: string = 'seen 5 days ago';
  action10: string = 'seen now';
  time: string = '12:02 PM';
  message: string = 'Yo';
  time2: string = '8:52 PM';
  message2: string = 'What\'s up? Did you need something?';
}

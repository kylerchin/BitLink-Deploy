import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MessageUserBarComponent } from '../../components/message-user-bar/message-user-bar.component';
import { NewMessageComponent } from '../../components/new-message/new-message.component';
import { MessageBoxComponent } from '../../components/message-box/message-box.component';
import { MessageTextBoxComponent } from '../../components/message-text-box/message-text-box.component';
import { TextMessageComponent } from '../../components/text-message/text-message.component';
import { SendMessageComponent } from '../../components/send-message/send-message.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  usertag: string;
  profile_pic: string;
  user_id: string;
}

interface Message {
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
}

interface ApiResponse {
  users: User[];
  messages: Message[];
}


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
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagePageComponent implements OnInit {
  users: User[] = [];
  messages: Message[] = [];
  sortedMessages: Message[] = [];

  constructor(private http: HttpClient) { }

  fetchUserInformation(): void {
    this.http.get<ApiResponse>('http://localhost:8888/api/account/messages')
      .subscribe({
        next: (data: ApiResponse) => {
          this.users = data.users;
          this.messages = data.messages;
          this.sortedMessages = this.sortMessages(data.messages);
          for (let i = 0; i < this.users.length; i++) {
            if (!this.users[i].usertag.startsWith('@')) {
                this.users[i].usertag = '@' + this.users[i].usertag;
            }
          }
        },
        error: (error) => {
          console.error("Error fetching user information:", error);
        }
      });
  }

  sortMessages(messages: Message[]): Message[] {
    // Combine received and sent messages into a single array
    const combinedMessages = [...messages];
    // Convert UTC timestamps to local time and sort the combined array based on timestamp
    combinedMessages.forEach(message => {
      // Check if the timestamp is already in the format "09:10 AM"
      if (!/^\d{1,2}:\d{2} [AP]M$/.test(message.timestamp)) {
          const date = new Date(message.timestamp);
          message.timestamp = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      }
    });
    // Sort the combined array based on timestamp
    combinedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    return combinedMessages;
  }



  ngOnInit(): void {
    this.fetchUserInformation();
  }

  readonly APIUrl = "http://localhost:8888/api/account/sendmessage";
  handleSendMessage(messageData: string[]) {
    const [text, sender_id, receiver_id, currentTime] = messageData;
    const url = `${this.APIUrl}?id1=${sender_id}&id2=${receiver_id}`;
    const postData = {
      message: text,
      time: currentTime
    };
  
    this.http.post(url, postData).subscribe({
      next: (data) => {
        alert(data);
        this.fetchUserInformation();
      },
      error: (error) => {
        console.error("Error Sending message:", error);
        this.fetchUserInformation();
      }
    });
  }
  

/*
  username2: string = 'C++ Chef';
  username3: string = 'XxEmo CoderxX';
  username4: string = 'Looking for Love';
  username5: string = 'Pineapple Under the Sea';
  username6: string = 'CS Coder';
  username7: string = 'LF GF';
  username8: string = 'SMILE';
  username9: string = 'UWU';
  username10: string = 'ID WIN';
  usertag2: string = '@ChefCPP';
  usertag3: string = '@SilkSongWhen';
  usertag4: string = '@LookingForBoyfriend';
  usertag5: string = '@RealSpongebob22';
  usertag6: string = '@CounterStrikePlayer';
  usertag7: string = '@NeedGFNow';
  usertag8: string = '@SmileyCoder';
  usertag9: string = '@UWUCODE';
  usertag10: string = '@NahIdWin';
  profile_pic2: string = 'assets/remy.jpg';
  profile_pic3: string = 'assets/cool-pfp.jpg';
  profile_pic4: string = 'assets/bw-female.jpg';
  profile_pic5: string = 'assets/sponge.jpg';
  profile_pic6: string = 'assets/sweating-mask.jpg';
  profile_pic7: string = 'assets/yada.jpg';
  profile_pic8: string = 'assets/smile.jpg';
  profile_pic9: string = 'assets/female.jpg';
  profile_pic10: string = 'assets/nahidwin.jpg';
  action2: string = 'seen 5 hours ago';
  action3: string = 'seen 9 hours ago';
  action4: string = 'seen 3 hours ago';
  action5: string = 'seen 10 hours ago';
  action6: string = 'seen 5 minutes ago';
  action7: string = 'seen 9 minutes ago';
  action8: string = 'seen 3 minutes ago';
  action9: string = 'seen 5 days ago';
  action10: string = 'seen now';
  */
  id1: string = '1';
  id2: string = '0';
}

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
import { CommonModule, NgIf } from '@angular/common';
import { AccountManagementService } from "../../services/account-management/account-management.service";

interface User {
  username: string;
  password?: string;
  email?: string;
  name: string;
  profile_pic: string;
  _id: string;
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
    CommonModule,
    NgIf
  ],
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagePageComponent implements OnInit {
  users: User[] = [];
  messages: Message[] = [];
  sortedMessages: Message[] = [];
  id1: string = '';
  id2: string = '';
  otherUser: string = '';

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
      next: (res)=> {console.log(res); this.id = JSON.parse(res)._id; this.currentName = JSON.parse(res).username}
    })
  }


  fetchUserInformation(): void {
    this.fetchMessages(this.id, this.otherUser);
  }

  fetchMessages(userId: string, otherUser: string): void {
    this.http.get<ApiResponse>(`http://localhost:8888/api/account/messages?user_id=${userId}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.users = data.users;
          this.messages = data.messages;
          this.sortedMessages = this.sortMessages(data.messages);
          console.log(this.messages);
          for (let i = 0; i < this.users.length; i++) {
            if (this.users && this.users[i] && !this.users[i].name?.startsWith('@')) {
              this.users[i].name = '@' + this.users[i].name;
            }
          }
          this.id1 = userId;
          if (otherUser == ''){
            this.id2 = this.users[0]._id;
          }
          else {
            this.id2 = otherUser;
          }
          console.log(this.users);

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

  handleUserSwap(id: string){
    this.fetchMessages(this.id, id);
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

}

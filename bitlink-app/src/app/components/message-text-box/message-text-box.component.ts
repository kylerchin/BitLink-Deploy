import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-message-text-box',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './message-text-box.component.html',
  styleUrl: './message-text-box.component.scss'
})
export class MessageTextBoxComponent {
  @Input() textField : String | undefined;
  @Input() width : number | undefined;
  @Input() height : number | undefined;
  @Input() sender_id: string | undefined;
  @Input() receiver_id: string | undefined;
  inputValue: string = ''; 
  
  constructor(private http: HttpClient) { }
  readonly APIUrl = "http://localhost:8888/api/account/sendmessage";
  submitFunction(text: string, sender_id: any, receiver_id: any) {
    console.log('Input Value:', text);
    const currentTime = new Date().toISOString().replace(/\.\d{3}/, '');
    const url = `${this.APIUrl}?id1=${sender_id}&id2=${receiver_id}`;
    const postData = {
      message: text,
      time: currentTime
    };

    this.http.post(url, postData).subscribe(data => {
      alert(data);
    });
  }

}

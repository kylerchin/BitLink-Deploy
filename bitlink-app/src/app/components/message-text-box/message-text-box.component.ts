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
  constructor(private http: HttpClient) { }
  readonly APIUrl = "http://localhost:4200/api/account/sendmessage";
  submitFunction(sender_id: any, receiver_id: any) {
    const inputValue = (document.getElementById('TextField') as HTMLInputElement).value;
    const currentTime = new Date().toISOString();
    const url = `${this.APIUrl}?id1=${sender_id}&id2=${receiver_id}`;
    const postData = {
      message: inputValue,
      time: currentTime
    };

    this.http.post(url, postData).subscribe(data => {
      alert(data);
    });
  }
  @Input() textField : String | undefined;
  @Input() width : number | undefined;
  @Input() height : number | undefined;
  @Input() sender_id: string | undefined;
  @Input() receiver_id: string | undefined;

}

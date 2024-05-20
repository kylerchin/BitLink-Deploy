import {Component, Input, EventEmitter, Output} from '@angular/core';
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
  @Output() SendMessage = new EventEmitter<string[]>();
  submitFunction(text: string, sender_id: string, receiver_id: string) {
    const currentTime = new Date().toISOString().replace(/\.\d{3}/, '');
    const messageData = [text, sender_id, receiver_id, currentTime]; 
    this.SendMessage.emit( messageData );
  }

}

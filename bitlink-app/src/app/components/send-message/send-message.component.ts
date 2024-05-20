import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [
    NgOptimizedImage, 
    CommonModule, 
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss'
})
export class SendMessageComponent {
  @Input() message: string = '';
  @Input() time: string ='';
  @Input() sender_id: string ='';
  @Input() receiver_id: string ='';
}

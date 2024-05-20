import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-message',
  standalone: true,
  imports: [
    NgOptimizedImage, 
    CommonModule, 
  ],
  templateUrl: './text-message.component.html',
  styleUrl: './text-message.component.scss'
})
export class TextMessageComponent {
  @Input() message: string = '';
  @Input() time: string ='';
  @Input() sender_id: string ='';
  @Input() receiver_id: string ='';
}

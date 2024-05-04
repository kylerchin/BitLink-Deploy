import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
  ],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})
export class NewMessageComponent {

}

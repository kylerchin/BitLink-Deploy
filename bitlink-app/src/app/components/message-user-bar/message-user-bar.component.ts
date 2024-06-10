import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-user-bar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './message-user-bar.component.html',
  styleUrl: './message-user-bar.component.scss'
})
export class MessageUserBarComponent {
  backgroundColor: string = '';
  @Output() SwapMessageUsers = new EventEmitter<string>();
  handleClick() {
    // Emitting the _id value when clicked
    this.SwapMessageUsers.emit(this.id);
  }

  handleMouseEnter() {
    // Change color slightly on hover
    this.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  }

  handleMouseLeave() {
    // Reset color when mouse leaves
    this.backgroundColor = '';
  }

  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() id: string = '';
  @Input() profile_pic: string = '';
}

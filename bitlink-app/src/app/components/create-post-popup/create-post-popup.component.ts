import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-post-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-post-popup.component.html',
  styleUrl: './create-post-popup.component.scss',
})
export class CreatePostPopupComponent {
  @Output() showChange = new EventEmitter<boolean>();
  @Input() show: boolean = false;
  closepopup() {
    this.show = false;
    this.showChange.emit(this.show);
  }
}

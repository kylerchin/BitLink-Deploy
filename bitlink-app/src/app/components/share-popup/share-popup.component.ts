import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-share-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-popup.component.html',
  styleUrl: './share-popup.component.scss',
})
export class SharePopupComponent {
  @Output() showChange = new EventEmitter<boolean>();
  @Input() show: boolean = false;
  closepopup() {
    this.show = false;
    this.showChange.emit(this.show);
  }
}

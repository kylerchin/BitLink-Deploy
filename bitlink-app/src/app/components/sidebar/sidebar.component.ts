import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { CreatePostPopupComponent } from '../create-post-popup/create-post-popup.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, CreatePostPopupComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileImagePath: string = 'assets/profile_picture.png';
  name: string = 'Jonny Boy';
  username: string = '@John BitLink';
  show = false;
  openpopup() {
    this.show = true;
    console.log('clicked');
  }
  popupclosed(show: boolean) {
    this.show = show;
  }
}

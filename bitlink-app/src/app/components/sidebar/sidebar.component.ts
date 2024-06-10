import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { CreatePostPopupComponent } from '../create-post-popup/create-post-popup.component';
import { AccountManagementService } from '../../services/account-management/account-management.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, CreatePostPopupComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileImagePath: string = 'assets/profile_picture.png';
  id: string = '6647cf24ebe437ca2de4e30d';
  name: string | undefined;
  username: string | undefined;
  show = false;

  constructor(private accountManagementService: AccountManagementService) {
    // this.nameInit();
    this.usernameInit();
  }

  openpopup() {
    this.show = true;
    console.log('clicked');
  }
  popupclosed(show: boolean) {
    this.show = show;
  }
  usernameInit() {
    this.accountManagementService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.id = JSON.parse(res)._id;
        this.username = JSON.parse(res).username;
        this.name = JSON.parse(res).name;
      },
    });
  }
}

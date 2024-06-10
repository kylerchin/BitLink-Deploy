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

  // nameInit() {
  //   let name;
  //   this.accountManagementService.fetchUser(this.id).subscribe({
  //     next: (res)=> {name = JSON.parse(res).name}
  //   }); return (name)? name : undefined;
  // }

  // usernameInit() {
  //   let name;
  //   this.accountManagementService.fetchUser(this.id).subscribe({
  //     next:(res)=>{name=JSON.parse(res).username}
  //   }); return (name)? '@' + name : undefined;

  // }
  // nameInit() {
  //   this.accountManagementService.fetchUser(this.id).subscribe({
  //     next: (res) => {
  //       this.id = JSON.parse(res)._id;
  //       this.name = JSON.parse(res).name;
  //     },
  //   });
  // }

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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountManagementService } from '../../services/account-management/account-management.service';

@Component({
  selector: 'app-create-post-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post-popup.component.html',
  styleUrl: './create-post-popup.component.scss',
})
export class CreatePostPopupComponent {
  @Output() showChange = new EventEmitter<boolean>();
  @Input() show: boolean = false;
  myForm: FormGroup;
  profileImagePath: string = 'assets/profile_picture.png';
  id: string = '6647cf24ebe437ca2de4e30d';
  name: string | undefined;
  username: string | undefined;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private accountManagementService: AccountManagementService
  ) {
    this.myForm = this.fb.group({
      title: [''],
      content: [''],
    });
    this.usernameInit();
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
  closepopup() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  submit() {
    const title = this.myForm.get('title')?.value;
    const content = this.myForm.get('content')?.value;
    const name = this.name;
    const username = this.username;
    const postData = {
      title: title,
      content: {
        message: content,
      },
      user: {
        username: name,
        usertag: username,
        profile_pic: this.profileImagePath,
      },
    };
    this.http
      .post('https://bitlinkbackend.catenarymaps.org/api/posts/create', postData, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          console.log('Post created successfully', res);
        },
        error: (err) => {
          console.error('Error creating post:', err);
        },
      });

    this.closepopup();
  }
}

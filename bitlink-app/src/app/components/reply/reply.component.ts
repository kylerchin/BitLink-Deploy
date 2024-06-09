import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountManagementService } from '../../services/account-management/account-management.service';
@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
})
export class ReplyComponent {
  @Input() textField: String = '';
  @Input() profile_picture: string = '';
  @Input() postId = '';
  @Output() commentAdded = new EventEmitter<void>();
  commentForm: FormGroup;
  profileImagePath: string = 'assets/profile_picture.png';
  id: string = '6647cf24ebe437ca2de4e30d';
  name: string | undefined;
  username: string | undefined;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private accountManagementService: AccountManagementService
  ) {
    this.commentForm = this.fb.group({
      content: [''],
    });
    this.nameInit();
    this.usernameInit();
  }
  nameInit() {
    this.accountManagementService.fetchUser(this.id).subscribe({
      next: (res) => {
        this.name = JSON.parse(res).name;
      },
    });
  }

  usernameInit() {
    this.accountManagementService.fetchUser(this.id).subscribe({
      next: (res) => {
        this.username = '@' + JSON.parse(res).username;
      },
    });
  }
  // ngOnInit(): void {
  //   if (this.postId) {
  //     this.nameInit();
  //     this.usernameInit();
  //   }
  // }
  submit() {
    const content = this.commentForm.get('content')?.value;
    const name = this.name;
    const username = this.username;
    const commentData = {
      comment: content,
      user: {
        username: name,
        usertag: username,
        profile_pic: this.profileImagePath,
      },
    };
    this.http
      .post(
        `http://localhost:8888/api/posts/${this.postId}/comment`,
        commentData,
        {
          responseType: 'text',
        }
      )
      .subscribe({
        next: (res) => {
          console.log('Comment created successfully', res);
          this.commentAdded.emit();
          this.commentForm.reset();
        },
        error: (err) => {
          console.error('Error creating comment:', err);
        },
      });
  }
}

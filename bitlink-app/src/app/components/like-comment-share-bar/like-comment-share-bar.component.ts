import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SharePopupComponent } from '../share-popup/share-popup.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AccountManagementService } from '../../services/account-management/account-management.service';

@Component({
  selector: 'app-like-comment-share-bar',
  standalone: true,
  imports: [SharePopupComponent, CommonModule, RouterModule],
  templateUrl: './like-comment-share-bar.component.html',
  styleUrls: ['./like-comment-share-bar.component.scss'],
})
export class LikeCommentShareBarComponent implements OnInit, OnChanges {
  @Input() like: string = '';
  @Input() repost: string = '';
  @Input() comment: string = '';
  @Input() save: string = '';
  @Input() postId: string = '';
  @Output() LikePost = new EventEmitter<string[]>();

  show = false;
  isLiked = false;
  post: any;
  peoplewholiked: any[] = [];
  id: string = '';
  name: string | undefined;
  username: string | undefined;

  constructor(
    private http: HttpClient,
    private accountManagementService: AccountManagementService
  ) {}

  ngOnInit(): void {
    this.usernameInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId']) {
      if (this.postId && this.id) {
        this.fetchLikes();
        console.log(this.id);
        console.log(this.postId);
      }
    }
  }

  usernameInit() {
    this.accountManagementService.getCurrentUser().subscribe({
      next: (res) => {
        const user = JSON.parse(res);
        this.id = user._id;
        this.username = user.username;
        this.name = user.name;
        if (this.postId) {
          this.fetchLikes();
        }
      },
    });
  }

  liked() {
    this.isLiked = !this.isLiked;
    console.log(this.id);
    if (this.isLiked) {
      this.http
        .put(`http://localhost:8888/api/posts/${this.postId}/like`, {
          userId: this.id,
        })
        .subscribe((res: any) => {
          console.log('Post liked successfully');
          this.fetchLikeCount();
        });
    } else {
      this.http
        .put(`http://localhost:8888/api/posts/${this.postId}/dislike`, {
          userId: this.id,
        })
        .subscribe((res: any) => {
          console.log('Post disliked successfully');
          this.fetchLikeCount();
        });
    }
  }

  fetchLikes(): void {
    this.http
      .get(`http://localhost:8888/api/posts/${this.postId}`)
      .subscribe((data: any) => {
        this.post = data;
        this.peoplewholiked = data.likedby;
        this.isLiked = this.peoplewholiked.includes(this.id);
      });
  }

  fetchLikeCount(): void {
    this.http
      .get(`http://localhost:8888/api/posts/${this.postId}`)
      .subscribe((data: any) => {
        this.post = data;
        this.like = data.likes;
        this.comment = data.comment_num;
      });
  }

  openpopup() {
    this.show = true;
    console.log('clicked');
  }

  popupclosed(show: boolean) {
    this.show = show;
  }
}

import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { SharePopupComponent } from '../share-popup/share-popup.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-like-comment-share-bar',
  standalone: true,
  imports: [SharePopupComponent, CommonModule],
  templateUrl: './like-comment-share-bar.component.html',
  styleUrl: './like-comment-share-bar.component.scss',
})
export class LikeCommentShareBarComponent {
  @Input() like: string = '';
  @Input() repost: string = '';
  @Input() comment: string = '';
  @Input() save: string = '';
  @Input() postId: string = '';
  // @Input() postId: string = '6647e9df10fa058d8154bfd1';
  @Output() LikePost = new EventEmitter<string[]>();

  show = false;
  isLiked = false;
  // postId: string = '6647e9df10fa058d8154bfd1';
  id: string = '6647cf24ebe437ca2de4e30d';
  post: any;
  peoplewholiked: any[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    if (this.postId) {
      this.fetchLikes();
    }
  }
  liked() {
    //need post.id
    this.isLiked = !this.isLiked;
    console.log(this.postId);
    if (this.isLiked) {
      //call route to add a like
      this.http
        .put(`http://localhost:8888/api/posts/${this.postId}/like`, {
          userId: this.id,
        })
        .subscribe((res: any) => {
          console.log('Post liked successfully');
          this.fetchLikeCount();
        });
    } else {
      //call route to remove a like
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
        console.log(this.like);
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

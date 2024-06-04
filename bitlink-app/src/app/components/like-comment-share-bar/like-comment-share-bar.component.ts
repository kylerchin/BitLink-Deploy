import { Component, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() LikePost = new EventEmitter<string[]>();

  show = false;
  liked() {
    if (this.like === 'liked') {
      this.like = '';
    } else {
      this.like = 'liked';
    }
    this.LikePost.emit([this.like, this.repost, this.comment, this.save]);
  }
  openpopup() {
    this.show = true;
    console.log('clicked');
  }
  popupclosed(show: boolean) {
    this.show = show;
  }
}

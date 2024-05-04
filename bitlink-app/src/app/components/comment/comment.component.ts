import { Component, Input } from '@angular/core';
import { LikeCommentShareBarComponent } from '../like-comment-share-bar/like-comment-share-bar.component';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [LikeCommentShareBarComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() profile_picture: string = '';
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() comment: string = '';
  @Input() like: string = '';
  @Input() repost: string = '';
  @Input() comment_number: string = '';
  @Input() save: string = '';
}

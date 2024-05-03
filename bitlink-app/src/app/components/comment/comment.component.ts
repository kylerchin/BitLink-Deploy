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
  like: string = '1.3K';
  repost: string = '673';
  comment_number: string = '1.1K';
  save: string = '315';
}

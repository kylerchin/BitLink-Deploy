import { Component, Input } from '@angular/core';
import { LikeCommentShareBarComponent } from '../like-comment-share-bar/like-comment-share-bar.component';
@Component({
  selector: 'app-post-component',
  standalone: true,
  imports: [LikeCommentShareBarComponent],
  templateUrl: './post-component.component.html',
  styleUrl: './post-component.component.scss',
})
export class PostComponentComponent {
  like: string = '2.4M';
  repost: string = '795K';
  comment_number: string = '132K';
  save: string = '1.4M';
  @Input() profile_picture: string = '';
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() date: string = '';
  @Input() message: string = '';
}

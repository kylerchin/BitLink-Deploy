import { Component, Input } from '@angular/core';
import { LikeCommentShareBarComponent } from '../like-comment-share-bar/like-comment-share-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-component',
  standalone: true,
  imports: [LikeCommentShareBarComponent, CommonModule],
  templateUrl: './post-component.component.html',
  styleUrl: './post-component.component.scss',
})
export class PostComponentComponent {
  @Input() like: string = '';
  @Input() repost: string = '';
  @Input() comment_number: string = '';
  @Input() save: string = '';
  @Input() profile_picture: string = '';
  @Input() username: string = '';
  @Input() usertag: string = '';
  @Input() date: string = '';
  @Input() message: string = '';
  @Input() video: string = '';
  @Input() timestamp: string = '';
  @Input() videoviews: string = '';
  @Input() image: string = '';
  @Input() postId: string = '';
}

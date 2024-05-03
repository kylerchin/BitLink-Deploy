import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-like-comment-share-bar',
  standalone: true,
  imports: [],
  templateUrl: './like-comment-share-bar.component.html',
  styleUrl: './like-comment-share-bar.component.scss',
})
export class LikeCommentShareBarComponent {
  @Input() like: string = '';
  @Input() repost: string = '';
  @Input() comment: string = '';
  @Input() save: string = '';
}

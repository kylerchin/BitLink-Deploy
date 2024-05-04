import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ReplyComponent } from '../../components/reply/reply.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';
@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SidebarComponent,
    SearchBarComponent,
    ReplyComponent,
    CommentComponent,
    PostComponentComponent,
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostPageComponent {
  profile_picture: string = 'assets/profile_picture.png';
  profile_picture2: string = 'assets/remy.jpg';
  username: string = 'C++ Chef';
  usertag: string = '@ChefCPP';
  usertag2: string = '@RustyRustacean';
  username2: string = 'Ferris the Crab';
  profile_picture3: string = 'assets/ferris-on-pattern.jpg';
  profile_picture4: string = 'assets/female.jpg';
  usertag3: string = '@CuteEgirlGamer';
  username3: string = 'Belle Delphine';
  date: string = '9:19 AM Apr 13, 2024';
  message: string = 'Rust coders be like...';
  timestamp: string = '0:35';
  video: string = 'assets/maid-outfit.jpg';
  videoviews: string = '13.2M';
  comment: string =
    'I really like this post! I think it is very informative and helpful for people looking to learn Rust. However, I feel like people should look towards C++ instead. C++ is a much more practical language than R or Rust.';
  like: string = '2.4M';
  repost: string = '795K';
  comment_number: string = '132K';
  save: string = '1.4M';
  comment2: string =
    'Hey I really like your posts and you seem to be making six figures. If you also happen to be six feet tall or taller, I think we would be a perfect couple together <3';
  like2: string = '23';
  comment_number2: string = '78';
  like3: string = '1.2K';
  repost3: string = '294';
  comment_number3: string = '392';
  save3: string = '132';
}

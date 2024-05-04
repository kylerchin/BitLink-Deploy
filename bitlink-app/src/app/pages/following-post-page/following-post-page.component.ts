import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FollowingButtonComponent } from '../../components/following-button/following-button.component';
import { ForYouButtonComponent } from '../../components/for-you-button/for-you-button.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';
import { ReplyComponent } from '../../components/reply/reply.component';
import { CommentComponent } from '../../components/comment/comment.component';

@Component({
  selector: 'app-following-post-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    FollowingButtonComponent,
    ForYouButtonComponent,
    PostComponentComponent,
    ReplyComponent,
    CommentComponent,
  ],
  templateUrl: './following-post-page.component.html',
  styleUrl: './following-post-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FollowingPostPageComponent {
  like: string = '921k'
  repost: string = '382K';
  comment_number: string = '203K';
  save: string = '282K';
  like2: string = '1.4M';
  repost2: string = '892K';
  comment_number2: string = '621K';
  save2: string = '402K';
  like3: string = '2.1M';
  repost3: string = '1M';
  comment_number3: string = '865K';
  save3: string = '921K';
  username2: string = 'XxEmo CoderxX';
  usertag2: string = '@SilkSongWhen';
  profile_picture3: string = 'assets/cool-pfp.jpg';
  date: string = '6:12 AM Apr 12, 2024';
  date2: string = '7:23 PM Apr 10, 2024';
  date4: string = '8:23 PM Apr 9, 2024';
  message: string = 'Just another image of R coders, nothing else to see here LOL';
  message2: string = 'Wow found my local R coder!';
  message4: string = 'NEW MEME JUST DROPPED! R Coders = CryBabies!';
  comment: string =
    'I really like this post! I think it is very informative and helpful for people looking to learn Rust. However, I feel like people should look towards C++ instead. C++ is a much more practical language than R or Rust.';
  image: string = 'assets/Crying-girl.jpg'; 
  image2: string = 'assets/cry.jpg';
  image3: string = 'assets/cry2.jpg';
}

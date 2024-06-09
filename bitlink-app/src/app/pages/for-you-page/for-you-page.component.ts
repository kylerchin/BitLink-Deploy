import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FollowingButtonComponent } from '../../components/following-button/following-button.component';
import { ForYouButtonComponent } from '../../components/for-you-button/for-you-button.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';
import { ReplyComponent } from '../../components/reply/reply.component';
import { CommentComponent } from '../../components/comment/comment.component';

@Component({
  selector: 'app-for-you-page',
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
  templateUrl: './for-you-page.component.html',
  styleUrl: './for-you-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ForYouPageComponent {
  like: string = '122K';
  repost: string = '62K';
  comment_number: string = '6,232';
  save: string = '12K';
  like2: string = '422K';
  repost2: string = '266K';
  comment_number2: string = '92K';
  save2: string = '44K';
  like3: string = '3.2M';
  repost3: string = '1.01M';
  comment_number3: string = '923K';
  save3: string = '912K';
  username: string = 'ID WIN';
  usertag: string = 'NahIdWin';
  profile_picture: string = 'assets/nahidwin.jpg';
  username2: string = 'SMILE';
  usertag2: string = 'SmileyCoder';
  profile_picture2: string = 'assets/smile.jpg';
  username3: string = 'Pineapple Under the Sea';
  usertag3: string = 'RealSpongebob22';
  profile_picture3: string = 'assets/sponge.jpg';
  date: string = '12:01 PM May 1, 2024';
  date2: string = '4:21 PM Apr 28, 2024';
  date4: string = '9:02 AM Apr 25, 2024';
  message: string =
    "R is SUPERIOR, and I MEAN SUPERIOR, to any other coding language out there, you all don't know anything about coding fr.";
  message2: string = 'C++ MAKES THE WORLD GO AROUND, GOD CODES IN C++!!!!!';
  message4: string = `Who lives in a pineapple under the sea? SpongeBob SquarePants! Absorbent and yellow and porous is he. SpongeBob SquarePants! If nautical nonsense be something you wish. 
                        SpongeBob SquarePants! Then drop on the deck and flop like a fish. SpongeBob SquarePants! SpongeBob SquarePants! SpongeBob SquarePants!`;
  comment: string =
    'I really like this post! I think it is very informative and helpful for people looking to learn Rust. However, I feel like people should look towards C++ instead. C++ is a much more practical language than R or Rust.';
  image: string = 'assets/crown.jpg';
  image2: string = 'assets/godcode.jpg';
}

import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ReplyComponent } from '../../components/reply/reply.component';
import { CommentComponent } from '../../components/comment/comment.component';
@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SidebarComponent,
    SearchBarComponent,
    ReplyComponent,
    CommentComponent,
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
  comment: string =
    'I really like this post! I think it is very informative and helpful for people looking to learn R. However, I feel like people should look towards C++ instead. C++ is a much more practical language than R or Rust.';
}

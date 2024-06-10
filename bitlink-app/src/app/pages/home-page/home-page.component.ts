import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FollowingButtonComponent } from '../../components/following-button/following-button.component';
import { ForYouButtonComponent } from '../../components/for-you-button/for-you-button.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';
import { ReplyComponent } from '../../components/reply/reply.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { CommonModule, NgIf } from '@angular/common';
import { AccountManagementService } from "../../services/account-management/account-management.service";
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../../../server/types';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    FollowingButtonComponent,
    ForYouButtonComponent,
    PostComponentComponent,
    ReplyComponent,
    CommentComponent,
    CommonModule,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {
  currentName : String | undefined;
  id: string = '"664a8e9008885a342d2837b4"';
  posts: any[] = [];

  constructor(private accountManagementService: AccountManagementService, private http: HttpClient) {
    this.nameInit();
  }

  nameInit() {
    this.accountManagementService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.id = JSON.parse(res)._id;
        this.currentName = JSON.parse(res).username;
        this.fetchPost();
      },
      error: (error) => {
        console.error("Error fetching current user information:", error);
        this.fetchPost();
      }
    });
  }

  fetchPost(): void {
    this.http.get<Post[]>(`https://bitlinkbackend.catenarymaps.org/api/posts`)
      .subscribe({
        next: (data: Post[]) => {
          this.posts = shuffle(data);
        },
        error: (error) => {
          console.error("Error fetching user information:", error);
        }
      });
  }
}

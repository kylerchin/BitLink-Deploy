import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FollowingButtonComponent } from '../../components/following-button/following-button.component';
import { ForYouButtonComponent } from '../../components/for-you-button/for-you-button.component';

@Component({
  selector: 'app-following-post-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    FollowingButtonComponent,
    ForYouButtonComponent,
  ],
  templateUrl: './following-post-page.component.html',
  styleUrl: './following-post-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FollowingPostPageComponent {

}

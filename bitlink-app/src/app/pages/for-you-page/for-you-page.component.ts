import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FollowingButtonComponent } from '../../components/following-button/following-button.component';
import { ForYouButtonComponent } from '../../components/for-you-button/for-you-button.component';


@Component({
  selector: 'app-for-you-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    FollowingButtonComponent,
    ForYouButtonComponent,
  ],
  templateUrl: './for-you-page.component.html',
  styleUrl: './for-you-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ForYouPageComponent {

}

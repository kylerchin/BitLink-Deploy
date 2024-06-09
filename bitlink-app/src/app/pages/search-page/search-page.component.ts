import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, PostComponentComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchPageComponent {
  username: string = 'Totally Real Guy';
  usertag: string = 'realguytrustme99';
  profile_picture: string = 'assets/ferris-on-pattern.jpg';
  date: string = '10:54 AM Jan 9, 2024';
  message: string =
    "Python's new features are game-changers! From pattern matching to improved error handling, this language keeps getting better. 🐍🚀 #Python #Coding #Tech";
  username2: string = 'PythonHaterTM';
  usertag2: string = 'whypythonisntgreat';
  profile_picture2: string = 'assets/ferris-on-pattern.jpg';
  date2: string = '2:53 PM Jan 11, 2024';
  message2: string =
    'This language is the worst! Indentation errors and slow execution speed make me want to scream. Here’s why you should never use python ever!!! 🙄 #PythonSucks #CodingFrustrations';
  timestamp: string = '1:57';
  video: string = 'assets/man.jpg';
  videoviews: string = '24.2M';
  like: string = '1.4M';
  repost: string = '273K';
  comment_number: string = '453K';
  save: string = '102K';
  like2: string = '221K';
  repost2: string = '89.3K';
  comment_number2: string = '132K';
  save2: string = '192K';
}

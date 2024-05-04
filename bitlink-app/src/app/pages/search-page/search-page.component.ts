import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent {

}

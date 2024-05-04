import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TosComponent } from '../../components/tos/tos.component';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    TosComponent
  ],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsComponent {

}

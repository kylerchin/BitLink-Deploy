import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsComponent {

}

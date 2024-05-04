import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    ContactFormComponent
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent {
  
}

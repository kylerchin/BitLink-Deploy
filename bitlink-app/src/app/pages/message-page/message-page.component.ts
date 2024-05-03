import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [
    SidebarComponent,
  ],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MessagePageComponent {

}

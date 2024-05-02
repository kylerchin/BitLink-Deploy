import {Component, ViewEncapsulation} from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {
name : String = "Johnny Boy"
}

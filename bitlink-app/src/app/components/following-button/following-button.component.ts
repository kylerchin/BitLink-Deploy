import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following-button',
  standalone: true,
  imports: [],
  templateUrl: './following-button.component.html',
  styleUrl: './following-button.component.scss'
})
export class FollowingButtonComponent {
  constructor(private router: Router) {}

  navigateToFollowing() {
    this.router.navigate(['/following-posts']);
  }

}

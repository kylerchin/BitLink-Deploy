import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-you-button',
  standalone: true,
  imports: [],
  templateUrl: './for-you-button.component.html',
  styleUrl: './for-you-button.component.scss'
})
export class ForYouButtonComponent {
  constructor(private router: Router) {}

  navigateToForYou() {
    this.router.navigate(['/for-you']);
  }

}

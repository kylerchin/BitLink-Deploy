import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostPageComponent {}

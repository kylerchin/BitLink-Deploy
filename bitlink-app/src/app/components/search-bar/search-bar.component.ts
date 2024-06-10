import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { query } from 'express';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor(private router: Router) {}
  @Input() textField: String | undefined;
  searchQuery: string = "";

  onSubmit() {
    if (this.searchQuery) {
      this.router.navigate(['/search'], {queryParams: {q: this.searchQuery}});
    }
  }
}

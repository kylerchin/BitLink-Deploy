import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, PostComponentComponent, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchPageComponent implements OnInit {
  query: string | null = "";
  posts: any[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.query = params['q'];
        if (this.query) {
          this.fetchResults(this.query)
        }
      })
  }
  fetchResults(query: string): void {
    this.http.get<any[]>(`http://localhost:8888/api/search?q=${query}`).subscribe(results => {
      this.posts = results;
    });
  }
}

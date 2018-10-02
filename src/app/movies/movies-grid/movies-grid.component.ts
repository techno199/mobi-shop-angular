import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.css']
})
export class MoviesGridComponent implements OnInit {
  movies: Movie[];
  totalResults: string;
  searchTerm: string;
  currentPage: string;

  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.searchTerm = params['s'];
        this.currentPage = params['page'];
        this.movieService.getMovies(this.searchTerm, this.currentPage || '1')
          .subscribe(response => {
            this.movies = response.movies;
            this.totalResults = response.totalResults;
          });
      })
  }

  onPageChange(pageEvent: PageEvent) {
    let nextPage = pageEvent.pageIndex + 1;
    let currentUrl = this.router.url.split('?')[0];
    this.router.navigate([currentUrl], { queryParams: {'s': this.searchTerm, 'page': nextPage }});
  }

}

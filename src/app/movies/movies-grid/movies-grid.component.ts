import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.css']
})
export class MoviesGridComponent implements OnInit {
  movies: Movie[];

  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.movieService.moviesChange
    //   .subscribe(movies => {
    //     this.movies = movies;
    //   });
    
    this.route.paramMap
      .subscribe(params => {
        let query = params.get('query');
        this.movieService.getMovies(query)
          .subscribe(movies => {
            this.movies = movies;
          });
      })
  }

}

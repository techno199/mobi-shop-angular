import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, debounceTime} from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';
/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  movies: Movie[] = [];
  @ViewChild('autocompleteInput', { read: MatAutocompleteTrigger }) trigger: MatAutocompleteTrigger;

  constructor(
    public movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.movieService.getMovies(value).subscribe(response => {
            if(response.movies.length) {
              this.movies = response.movies;
            }
            else {
              this.movies = [];
            }
          },
          error => {
            this.movies = [];
          }
        );
      })

    // this.movieService.moviesChange
    // .subscribe(movies => {
    //   this.movies = movies;
    // }, error => {
    //   this.movieService.clearMovies();
    // });

  }

  /**
   * Open either particular movie or search results
   */
  onSelect() {
    this.movieService.getMovies(this.myControl.value)
      .subscribe(response => {
        // Open movie details if found single appropriate result
        if (response.movies.length === 1) {
          this.router.navigate(['/detail', response.movies[0].imdbID]);
        }
        else {
          this.router.navigate(['/search'], { queryParams: { 's': this.myControl.value }});
        }
      });
    this.trigger.closePanel();
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Movie } from '../../models/movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private domainUrl = 'http://www.omdbapi.com';
  private apikey = 'ea799544';
  movies: Movie[] = [];
  moviesChange: Subject<Movie[]> = new Subject<Movie[]>();

  constructor(
    private http: HttpClient
  ) { 
    this.moviesChange.subscribe(movies => {
      this.movies = movies
    });
  }

 /**
  * Get movies by search params
  * 
  * @param search 
  * Title of movie
  */
  getMovies(search: string = '', page: string = '1'): Observable<{movies: Movie[], totalResults: string}> {
    let options = {
      params: new HttpParams()
        .set('s', search)
        .set('page', page)
        .set('apikey', this.apikey)
    }

    // Clear
    if (search === '') {
      this.clearMovies();
      return of({movies: [], totalResults: '0'});
    }
    else {
      return this.http.get(this.domainUrl, options)
      .pipe(
        map( response => {
          if (response['Search']) {
            return {movies: response['Search'], totalResults: response['totalResults']};
          } 
          else {
            return {movies: [], totalResults: '0'};
          }
        }),
        map( response => {
          let movies: Movie[] = [];
          for (let movie of response.movies) {
            movies.push(movie as Movie);
          }
          response.movies = movies;
          return response;
        }),
        tap( response => {
          if (response.movies.length > 0) {
            this.moviesChange.next(response.movies);
          }
        },
        error => {
          console.log(error);
          return [];
        })
      )
    }
  }

  /**
   * Get movie description by imdb id
   * @param id 
   * imdb id
   */
  getMovie(imdbId: string): Observable<Movie> {
    let options = {
      params: new HttpParams()
        .set('i', imdbId)
        .set('plot', 'full')
        .set('apikey', this.apikey)
    }

    return this.http.get(this.domainUrl, options);
  }

  clearMovies(): void {
    this.moviesChange.next([]);
  }
}

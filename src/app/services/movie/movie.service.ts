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
  getMovies(search: string = ''): Observable<Movie[]> {
    let options = {
      params: new HttpParams()
        .set('s', search)
        .set('apikey', this.apikey)
    }

    // Clear
    if (search === '') {
      this.clearMovies();
    }
    else {
      return this.http.get(this.domainUrl, options)
      .pipe(
        map( response => {
          return response['Search'] ? response['Search'] : [];
        }),
        map( response => {
          let movies: Movie[] = [];
          for (let result of response) {
            movies.push(result as Movie);
          }
          return movies
        }),
        tap( movies => {
          if (movies.length > 0) {
            this.moviesChange.next(movies);
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

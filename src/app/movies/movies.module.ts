import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { ExplorerComponent } from './explorer/explorer.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ],
  declarations: [
    ExplorerComponent,
    MovieDetailComponent,
    MoviesGridComponent
  ]
})
export class MoviesModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';

const routes: Routes = [
  { 
    path: '', 
    component: ExplorerComponent,
    children: [
      {
        path: 'detail/:id',
        component: MovieDetailComponent
      },
      {
        path: 'search/:query',
        component: MoviesGridComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }

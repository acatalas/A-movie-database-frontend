import { Routes } from '@angular/router';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesPageComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  // Aquí podríamos cargar un página de error 404 por ejemplo
  { path: '**', redirectTo: '/movies' },
];

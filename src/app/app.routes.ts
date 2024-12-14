import { Routes } from '@angular/router';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesDiscoverPageComponent } from './movies-discover-page/movies-discover-page.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesPageComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'discover', component: MoviesDiscoverPageComponent},
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  // Aquí podríamos cargar un página de error 404 por ejemplo
  { path: '**', redirectTo: '/movies' },
];

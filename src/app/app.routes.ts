import { Routes } from '@angular/router';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesDiscoverPageComponent } from './movies-discover-page/movies-discover-page.component';
import { ListsPageComponent } from './lists-page/lists-page.component';
import { ListMoviesPageComponent } from './list-movies-page/list-movies-page.component';

export const routes: Routes = [
    {
        path: 'movies',
        children: [
            { path: '', component: MoviesPageComponent },
            { path: ':id', component: MovieDetailComponent },
        ],
    },
    { path: 'discover', component: MoviesDiscoverPageComponent },
    {
        path: 'lists',
        children: [
            { path: '', component: ListsPageComponent },
            { path: ':id', component: ListMoviesPageComponent },
        ],
    },
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    // Aquí podríamos cargar un página de error 404 por ejemplo
    { path: '**', redirectTo: '/movies' },
];

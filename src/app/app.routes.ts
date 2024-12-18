import { Routes } from '@angular/router';
import { ListMoviesPageComponent } from './lists/pages/list-detail-page/list-detail-page.component';
import { ListsPageComponent } from './lists/pages/lists-page/lists-page.component';
import { MoviesDiscoverPageComponent } from './movies/pages/movies-discover-page/movies-discover-page.component';
import { MoviesPageComponent } from './movies/pages/movies-page/movies-page.component';
import { MovieDetailPageComponent } from './movies/pages/movie-detail-page/movie-detail-page.component';


export const routes: Routes = [
    {
        path: 'movies',
        children: [
            { path: '', component: MoviesPageComponent, title: 'a Movie Database' },
            { path: ':id', component: MovieDetailPageComponent },
        ],
    },
    { path: 'discover', component: MoviesDiscoverPageComponent, title: 'Descubre | aMDb' },
    {
        path: 'lists',
        children: [
            { path: '', component: ListsPageComponent, title: 'Listas | aMDb' },
            { path: ':id', component: ListMoviesPageComponent },
        ],
    },
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: '**', redirectTo: '/movies' },
];

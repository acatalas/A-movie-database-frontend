import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MoviesFilterComponent } from '../movies-filter/movies-filter.component';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesPagination } from '../interfaces/movies-pagination';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FilterParams } from '../interfaces/filter-params';

@Component({
    selector: 'movies-discover-page',
    imports: [MoviesFilterComponent, MovieCardComponent],
    templateUrl: './movies-discover-page.component.html',
    styleUrl: './movies-discover-page.component.css',
})
export class MoviesDiscoverPageComponent {
    moviesService = inject(MoviesService);
    movies = signal<Movie[]>([]);

    destroyRef = inject(DestroyRef);

    constructor() {
        this.loadDefaultMovies();
    }

    //loads the default movies that are shown when the search term is empty
    loadDefaultMovies(): void {
        this.moviesService
            .getMovies()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (movies: MoviesPagination) => {
                    this.movies.set(movies.results);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(`Error obteniendo productos: `, error);
                },
            });
    }

    filterMovies(filterParams: FilterParams): void {
        //filter
        const filterParamOptions = new HttpParams()
            .set('with_watch_providers', filterParams.watchProviders.join('|'))
            .set(
                'with_watch_monetization_types',
                filterParams.watchMonetizationTypes.join('|')
            )
            .set('watch_region', 'ES'); //with_watch_providers: 1|2|55
        this.moviesService
            .getMovies(filterParamOptions)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (movies: MoviesPagination) => {
                    this.movies.set(movies.results);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(`Error obteniendo productos: `, error);
                },
            });
    }
}

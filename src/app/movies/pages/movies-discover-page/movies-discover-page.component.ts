import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Movie } from '../../../interfaces/movie';
import { MoviesService } from '../../../services/movies.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesPagination } from '../../../interfaces/movies-pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { FilterParams } from '../../../interfaces/filter-params';
import { MoviesFilterComponent } from '../../components/movies-filter/movies-filter.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
    selector: 'movies-discover-page',
    imports: [MoviesFilterComponent, MovieCardComponent],
    templateUrl: './movies-discover-page.component.html',
    styleUrl: './movies-discover-page.component.css',
})
export class MoviesDiscoverPageComponent {
    #moviesService = inject(MoviesService);
    #localStorageService = inject(LocalStorageService);

    movies = signal<Movie[]>([]);
    destroyRef = inject(DestroyRef);

    constructor() {
        this.loadDefaultMovies();
    }

    //loads the default movies that are shown when the search term is empty
    loadDefaultMovies(): void {
        this.#moviesService
            .getMovies()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (movies: MoviesPagination) => {
                    console.log(movies.results)
                    this.addRatingsFromLocalStorage(movies.results);
                    this.movies.set(movies.results);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(`Error obteniendo productos: `, error);
                },
            });
    }

    filterMovies(filterOptions: FilterParams): void {
        this.#moviesService
            .getMovies(1, filterOptions)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (movies: MoviesPagination) => {
                    this.addRatingsFromLocalStorage(movies.results);
                    this.movies.set(movies.results);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(`Error obteniendo productos: `, error);
                },
            });
    }

    addRatingsFromLocalStorage(movies: Movie[]) {
        movies.map((movie) => {
            const rating = this.#localStorageService.getMovieRating(movie.id!);
            if (rating !== null) {
                movie.userRating = rating;
            }
        });
    }
}

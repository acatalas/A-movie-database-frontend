import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, Subscription } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Movie } from '../../../interfaces/movie';
import { MoviesPagination } from '../../../interfaces/movies-pagination';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
    selector: 'movies-page',
    imports: [MovieCardComponent, FormsModule],
    templateUrl: './movies-page.component.html',
    styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
    #moviesService = inject(MoviesService);
    #localStorageService = inject(LocalStorageService);
    movies = signal<Movie[]>([]);
    defaultMovies: Movie[] = [];
    search = signal('');

    //convert search() signal to observable since signals don't have a native debounceTime equivalent,
    //then, convert it back to a signal, since we want to make use of their functionalities
    delayedSearchTerm = toSignal(toObservable(this.search).pipe(debounceTime(1000)), { initialValue: '' });

    destroyRef = inject(DestroyRef);

    filteredMovies = new Subscription();
    constructor() {
        this.filteredMovies = toObservable<string>(this.delayedSearchTerm).subscribe({
            next: (searchTerm) => {
                //if no search term is supplied, get Discovery movies, since a search term is needed for the search endpoint
                if (searchTerm === '') {
                    this.loadDefaultMovies();
                    //if search term is supplied, filter by title. We can't use the Discovery endpoint since it does not filter by title
                } else {
                    this.getMoviesByTitle(searchTerm);
                }
            },
        });
    }

    //loads the default movies that are shown when the search term is empty
    loadDefaultMovies(): void {
        if (this.defaultMovies.length <= 0) {
            this.#moviesService
                .getMovies()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (movies: MoviesPagination) => {
                        this.defaultMovies = movies.results;
                        this.setRatingFromLocalStorage(this.defaultMovies);
                        this.movies.set(this.defaultMovies);
                    },
                    error: (error: HttpErrorResponse) => {
                        console.error(`Error obteniendo productos: `, error);
                    },
                });
        } else {
            this.movies.set(this.defaultMovies);
        }
    }

    setRatingFromLocalStorage(movies: Movie[]) {
        movies.map((movie) => {
            const rating = this.#localStorageService.getMovieRating(movie.id!);
            if (rating !== null) {
                movie.userRating = rating;
            }
        });
    }

    getMoviesByTitle(title: string): void {
        this.#moviesService
            .getMoviesByTitle(title)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (movies: MoviesPagination) => {
                    this.setRatingFromLocalStorage(movies.results);
                    this.movies.set(movies.results);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(`Error obteniendo productos: `, error);
                },
            });
    }
}

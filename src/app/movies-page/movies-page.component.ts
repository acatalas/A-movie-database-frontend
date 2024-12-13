import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviesService } from '../services/movies.service';
import { FormsModule } from '@angular/forms';
import { Movie } from '../interfaces/movie';
import {
    takeUntilDestroyed,
    toObservable,
    toSignal,
} from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, Subscription } from 'rxjs';
import { MoviesPagination } from '../interfaces/movies-pagination';

@Component({
    selector: 'movies-page',
    imports: [MovieCardComponent, FormsModule],
    templateUrl: './movies-page.component.html',
    styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
    moviesService = inject(MoviesService);
    movies = signal<Movie[]>([]);
    search = signal('');

    //convert search() signal to observable since signals don't have a native debounceTime equivalent,
    //then, convert it back to a signal, since we want to make use of their functionalities
    delayedSearchTerm = toSignal(
        toObservable(this.search).pipe(debounceTime(1000)),
        { initialValue: '' }
    );

    destroyRef = inject(DestroyRef);

    filteredMovies = new Subscription();
    constructor() {
        
        this.filteredMovies = toObservable<string>(
            this.delayedSearchTerm
        ).subscribe({
            next: (searchTerm) => {
                //if no search term is supplied, get Discovery movies, since a search term is needed for the search endpoint
                if (searchTerm === '') {
                    this.moviesService
                        .getMovies()
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(this.handleMovieSubscription());
                //if search term is supplied, filter by title. We can't use the Discovery endpoint since it does not filter by title
                } else {
                    this.moviesService
                        .getMoviesByTitle(searchTerm)
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(this.handleMovieSubscription());
                }
            },
        });
    }

    handleMovieSubscription() {
        return {
            next: (movies: MoviesPagination) => {
                this.movies.set(movies.results);
            },
            error: (error: HttpErrorResponse) => {
                console.error(
                    `Error obteniendo productos: `,
                    error
                );
            }
        }
    } 
}
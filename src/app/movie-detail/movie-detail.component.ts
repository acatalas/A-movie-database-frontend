import {
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    numberAttribute,
    signal,
} from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { IntlDatePipe } from '../pipes/intl-date.pipe';
import { MinutesToHoursPipe } from '../pipes/minutes-to-hours.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
    selector: 'movie-detail',
    imports: [DatePipe, IntlDatePipe, MinutesToHoursPipe, StarRatingComponent],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
    id = input.required({ transform: numberAttribute });

    #moviesService = inject(MoviesService);
    #localStorageService = inject(LocalStorageService);
    #destroyRef = inject(DestroyRef);
    #title = inject(Title);
    
    movie = signal<Movie | null>(null);
    genreTitles: string[] | undefined = undefined;
    
    constructor() {
        effect(() => {
            this.#moviesService
                .getMovie(this.id())
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe({
                    next: (movie) => {
                        this.setRatingFromLocalStorage(movie);
                        this.movie.set(movie);
                        this.#title.setTitle(this.movie()!.title);
                        this.genreTitles = this.movie()?.genres!.flatMap(
                            (genre) => genre.name
                        );
                    },
                    error: (error: HttpErrorResponse) => {
                        console.error(`Error obteniendo productos: `, error);
                    },
                });
        });
    }

    setRatingFromLocalStorage(movie: Movie) {
        const rating = this.#localStorageService.getMovieRating(movie.id!);
        if (rating !== null) {
            movie.userRating = rating;
        }
    }

    changeRating(rating: number) {
        this.movie()!.userRating = rating;
        this.#localStorageService.saveMovieRating(this.movie()!.id!, rating);
    }
}

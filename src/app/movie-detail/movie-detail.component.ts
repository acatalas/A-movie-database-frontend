import {
    ChangeDetectorRef,
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

@Component({
    selector: 'movie-detail',
    imports: [DatePipe, IntlDatePipe, MinutesToHoursPipe, StarRatingComponent],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
    id = input.required({ transform: numberAttribute });
    movie = signal<Movie | null>(null);
    genreTitles: string[] | undefined = undefined;
    #moviesService = inject(MoviesService);
    changeDetector = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    #title = inject(Title);

    constructor() {
        effect(() => {
            this.#moviesService
                .getMovie(this.id())
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (movie) => {
                        this.movie.set(movie);
                        this.#title.setTitle(
                            this.movie()!.title
                        );
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

    changeRating(rating: number) {
        this.movie()!.userRating = rating;
    }
}

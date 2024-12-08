import {
  ChangeDetectorRef,
  Component,
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
  #title = inject(Title);

  constructor() {
    effect(() => {
      this.movie.set(this.#moviesService.getMovie(this.id()));
      this.#title.setTitle(this.movie()?.title + ' | Angular Products');
      this.genreTitles = this.movie()?.genres.flatMap((genre) => genre.name);
    });
  }

  changeRating(rating: number) {
    console.log(rating)
    this.movie()!.userRating = rating;
    this.#moviesService.changeRating(this.movie()!.id!, rating)
  }
}

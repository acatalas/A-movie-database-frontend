import {
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

@Component({
  selector: 'movie-detail',
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  id = input.required({ transform: numberAttribute });
  movie = signal<Movie | null>(null);
  #moviesService = inject(MoviesService);
  #title = inject(Title);

  constructor() {
    effect(() => {
      this.movie.set(this.#moviesService.getMovie(this.id()));
      this.#title.setTitle(this.movie()?.title + ' | Angular Products');
    });
  }
}

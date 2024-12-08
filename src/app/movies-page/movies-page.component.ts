import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'movies-page',
  imports: [MovieCardComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {
  moviesService = inject(MoviesService)
  movies = this.moviesService.getMovies();
}

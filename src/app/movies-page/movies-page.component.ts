import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviesService } from '../services/movies.service';
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Component({
  selector: 'movies-page',
  imports: [MovieCardComponent, MovieDetailComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {
  moviesService = inject(MoviesService)
  movies = this.moviesService.getMovies();
}

import { Component, inject, input } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'movie-card',
  imports: [DecimalPipe, RouterLink, StarRatingComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  movie = input.required<Movie>()
  #moviesService = inject(MoviesService)

  changeRating(rating: number) {
    console.log(rating)
    this.movie()!.userRating = rating;
    this.#moviesService.changeRating(this.movie()!.id!, rating)
  }
}


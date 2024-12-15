import { Component, inject, input } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'movie-card',
  imports: [DecimalPipe, RouterLink, StarRatingComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  movie = input.required<Movie>()
  #localStorageService = inject(LocalStorageService)

  changeRating(rating: number) {
    this.movie()!.userRating = rating;
    this.#localStorageService.saveMovieRating(this.movie()!.id!, rating)
  }
}


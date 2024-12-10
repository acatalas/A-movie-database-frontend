import { Component, computed, inject, signal } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviesService } from '../services/movies.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'movies-page',
  imports: [MovieCardComponent, FormsModule],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {
  moviesService = inject(MoviesService)
  movies = this.moviesService.getMovies();

  search = signal('');

  filteredMovies = computed(() => {
    const searchText = this.search().toLowerCase();
    return this.movies.filter(
      (e) =>
        e.title.toLowerCase().includes(searchText)
    );
  });
  
}

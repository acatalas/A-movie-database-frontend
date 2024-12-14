import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Genre } from '../interfaces/genre';
import { Movie } from '../interfaces/movie';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'movie-form',
    imports: [FormsModule],
    templateUrl: './movie-form.component.html',
    styleUrl: './movie-form.component.css',
})
export class MovieFormComponent {
    #moviesService = inject(MoviesService);
    genres = signal<Genre[]>([]);
    newMovie: Movie = {
        title: '',
        genres: [],
        overview: '',
        runtime: 0,
        popularity: 0,
        voteAverage: 0,
        voteCount: 0,
        backdropPath: '',
        posterPath: '',
        releaseDate: '',
        status: '',
        userRating: 0,
    };

    constructor() {
        this.#moviesService.getGenres().pipe(takeUntilDestroyed()).subscribe({
          next: (genres) => {
            this.genres.set(genres)
            this.newMovie.genres![0] = genres[0];
            this.newMovie.genres![0] = genres[0];
          }
        });
    }

    addMovie(movieForm: NgForm) {
        this.#moviesService.addMovie({ ...this.newMovie });
        console.log(this.newMovie);
        movieForm.resetForm();
        this.newMovie.genres = [this.genres()[0], this.genres()[1]];
    }

    changeImage(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput.files?.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', () => {
            this.newMovie.posterPath = reader.result as string;
            //this.#changeDetector.markForCheck(); // Marca el componente como dirty
        });
    }
}

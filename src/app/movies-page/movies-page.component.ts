import { Component, computed, inject, signal } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviesService } from '../services/movies.service';
import { FormsModule } from '@angular/forms';
import { Movie } from '../interfaces/movie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'movies-page',
    imports: [MovieCardComponent, FormsModule],
    templateUrl: './movies-page.component.html',
    styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
    moviesService = inject(MoviesService);
    movies = signal<Movie[]>([]);

    search = signal('');

    filteredMovies = computed(() => {
        const searchText = this.search().toLowerCase();
        return this.movies().filter((e) =>
            e.title.toLowerCase().includes(searchText)
        );
    });

    constructor() {
        this.moviesService
            .getMovies()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (movies) => {
                    this.movies.set(movies.results);
                },
                error: (error: HttpErrorResponse) =>
                    console.error(`Error obteniendo productos: `, error),
            });
    }
}

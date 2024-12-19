import { Component, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { filter } from 'rxjs';

@Component({
    selector: 'navbar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    #moviesService = inject(MoviesService);
    randomMovieId = signal(0);
    #router = inject(Router);

    constructor() {
        this.#router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(() => {
            this.#moviesService.getRandomMovieId().subscribe({
                next: (movieId) => {
                    this.randomMovieId.set(movieId);
                },
            });
        });
    }
}

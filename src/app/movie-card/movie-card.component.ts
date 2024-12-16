import { Component, inject, input, output } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { LocalStorageService } from '../services/local-storage.service';
import { ListsService } from '../services/lists.service';
import { List } from '../interfaces/list';
import { IntlDatePipe } from '../pipes/intl-date.pipe';

@Component({
    selector: 'movie-card',
    imports: [DecimalPipe, RouterLink, StarRatingComponent, IntlDatePipe],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
    #localStorageService = inject(LocalStorageService);
    #listsService = inject(ListsService);

    unlist = output<number>();

    movie = input.required<Movie>();
    lists = this.#listsService.getLists();

    changeRating(rating: number) {
        this.movie()!.userRating = rating;
        this.#localStorageService.saveMovieRating(this.movie()!.id!, rating);
    }

    addMovieToList(list: List): void {
        this.#localStorageService.addMovieToList(list.id!, this.movie());
        this.lists.find((l) => l.id === list.id)?.movies.push(this.movie());
    }

    listHasMovie(list: List): boolean {
        return list.movies.find((m) => m.id === this.movie().id) !== undefined;
    }

    removeMovieFromList(list: List): void {
        //remove movie from local storage
        this.#localStorageService.removeMovieFromList(list.id!, this.movie());
        this.unlist.emit(list.id!);
        this.lists
            .find((l) => l.id === list.id)
            ?.movies.splice(
                list.movies.findIndex((m) => m.id === this.movie().id),
                1
            );
        console.log(this.lists);
    }
}

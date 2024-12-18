import { Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { List } from '../../../interfaces/list';
import { Title } from '@angular/platform-browser';
import { MovieCardComponent } from '../../../movies/components/movie-card/movie-card.component';

@Component({
    selector: 'list-detail-page',
    imports: [MovieCardComponent],
    templateUrl: './list-detail-page.component.html',
    styleUrl: './list-detail-page.component.css',
})
export class ListMoviesPageComponent {
    id = input.required({ transform: numberAttribute });

    #listsService = inject(ListsService);
    #title = inject(Title);

    list = signal<List | null>(null);

    constructor() {
        effect(() => {
            this.list.set(this.#listsService.getList(this.id()));
            this.#title.setTitle(this.list()!.title + ' | aMDb');
        });
    }

    removeFromList(list_id: number, movie_id: number): void {
        //check that the movie is being removed from the current list
        if (this.list()!.id !== list_id) {
            return;
        }

        //find the index of the movie inside the list
        const movieId = this.list()!.movies.findIndex((m) => m.id === movie_id);

        //if found, remove from current list
        if (movieId >= 0) {
            this.list()?.movies.splice(movieId, 1);
        }
    }
}

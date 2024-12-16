import {
    Component,
    effect,
    inject,
    input,
    numberAttribute,
    signal,
} from '@angular/core';
import { ListsService } from '../services/lists.service';
import { List } from '../interfaces/list';
import { Title } from '@angular/platform-browser';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
    selector: 'list-movies-page',
    imports: [MovieCardComponent],
    templateUrl: './list-movies-page.component.html',
    styleUrl: './list-movies-page.component.css',
})
export class ListMoviesPageComponent {
    id = input.required({ transform: numberAttribute });

    #listsService = inject(ListsService);
    #title = inject(Title);

    list = signal<List | null>(null);

    constructor() {
        effect(() => {
            this.list.set(this.#listsService.getList(this.id()));
            this.#title.setTitle(this.list()!.title + ' | Lista');
        });
    }
}

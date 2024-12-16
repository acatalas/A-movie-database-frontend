import { Component, inject, signal } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { FormsModule, NgForm } from '@angular/forms';
import { List } from '../interfaces/list';
import { ListCardComponent } from '../list-card/list-card.component';

@Component({
    selector: 'lists-page',
    imports: [FormsModule, ListCardComponent],
    templateUrl: './lists-page.component.html',
    styleUrl: './lists-page.component.css',
})
export class ListsPageComponent {
    #listsService = inject(ListsService);
    lists = signal(this.#listsService.getLists());
    newList: List = {
        id: 0,
        title: '',
        description: '',
        favoriteCount: 0,
        itemCount: 0,
        listType: '',
        posterPath: null,
        movies: []
    };

    addList(listForm: NgForm) {
        console.log(this.newList);

        this.#listsService.createList({ ...this.newList });
        this.lists.set(this.#listsService.getLists());

        listForm.resetForm();
    }

    deleteList(list: List): void {
        this.#listsService.deleteList(list.id!);
        this.lists.update(lists => lists.filter((l) => l.id !== list.id));
    }
}

import { Injectable } from '@angular/core';
import { List } from '../interfaces/list';
import { Movie } from '../interfaces/movie';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    //stores the rating of a movie
    saveMovieRating(id: number, rating: number): void {
        this.#setItem('movie-' + id, rating + '');
    }

    //retrieves the rating of a movie, or null if it hasn't been stored
    getMovieRating(id: number): number | null {
        const rating = this.#getItem('movie-' + id);
        if (rating === null) {
            return null;
        }
        return Number(rating);
    }

    hasMovieRating(id: number) {
        return this.#getItem('movie-' + id) !== null;
    }

    getLists(): List[] {
        const listsJson = this.#getItem('lists');
        if (listsJson === null) {
            return [];
        }
        return JSON.parse(listsJson);
    }

    getList(id: number): List | null {
        const lists = this.getLists();
        if (lists.length <= 0) {
            return null;
        }
        const list = lists.find((list) => {
            return list.id === id;
        });
        return list === undefined ? null : list;
    }

    addList(list: List): void {
        //get id to use
        if (list.id === 0) {
            list.id = this.#getLastListId() + 1;
        }

        //add to existing lists
        const lists = this.getLists();
        lists.push(list);
        this.#setItem('lists', JSON.stringify(lists));
    }

    deleteList(id: number): void {
        const lists = this.getLists();
        const filteredLists = lists.filter((list) => list.id !== id);
        this.#setItem('lists', JSON.stringify(filteredLists));
    }

    addMovieToList(list_id: number, movie: Movie): void {
        const list = this.getList(list_id);

        //check if the movie is already in the list
        if (list === null) {
            return;
        }

        const duplicateMovies = list.movies.filter((m) => m.id === movie.id);

        //if the movie is already in the list, do nothing.
        if (duplicateMovies.length > 0) {
            return;
        }

        list.posterPath = movie.posterPath;
        
        //add movie to list
        list.movies.push(movie);

        //delete list from storage
        this.deleteList(list_id);

        //add list
        this.addList(list!);
    }

    removeMovieFromList(list_id: number, movie: Movie) {
        const list = this.getList(list_id);

        //check if the movie is already in the list
        if (list === null) {
            return;
        }

        const movieIndex = list.movies.findIndex((m) => m.id === movie.id);

        //if the movie isn't in the list, do nothing
        if (movieIndex < 0) {
            return;
        }

        //remove movie from list
        list?.movies.splice(movieIndex, 1);

        //delete list from storage
        this.deleteList(list_id);

        //add list
        this.addList(list!);
    }

    #getLastListId(): number {
        const lists = this.getLists();
        if (lists.length <= 0) {
            return 0;
        }
        const listIds = lists.flatMap((list) => {
            return list.id!;
        });
        listIds.sort(function (a, b) {
            return a - b;
        });
        return listIds[listIds.length - 1];
    }

    // Set a value in local storage
    #setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    // Get a value from local storage
    #getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    // Remove a value from local storage
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

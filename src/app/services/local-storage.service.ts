import { Injectable } from '@angular/core';
import { List } from '../interfaces/list';

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
      const newId = this.#getLastListId() + 1;
      list.id = newId;

      //add to existing lists
      const lists = this.getLists();
      lists.push(list);
      this.#setItem('lists', JSON.stringify(lists))
    }

    deleteList(id: number): void {
      const lists = this.getLists();
      const filteredLists = lists.filter(list => list.id !== id);
      this.#setItem('lists', JSON.stringify(filteredLists));
    }

    #getLastListId(): number {
      const lists = this.getLists();
      if(lists.length <= 0){
        return 1;
      }
      const listIds = lists.flatMap(list => {
        return list.id!;
      })
      listIds.sort(function(a, b) {
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

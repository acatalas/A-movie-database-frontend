import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { List } from '../interfaces/list';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  #localStorageService  = inject(LocalStorageService);

  getList(id: number): List | null {
    return this.#localStorageService.getList(id);
  }

  getLists(): List[] {
    return this.#localStorageService.getLists();
  }

  createList(list: List): void {
    this.#localStorageService.addList(list);
  }

  deleteList(id: number): void {
    this.#localStorageService.deleteList(id);
  }

  addMovieToList(list_id: number, movie: Movie): void{
    this.#localStorageService.addMovieToList(list_id, movie);
  }

  removeMovieFromList(list_id: number, movie: Movie): void {
    this.#localStorageService.removeMovieFromList(list_id, movie);
  }
}

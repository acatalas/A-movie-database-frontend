import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { List } from '../interfaces/list';

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
}

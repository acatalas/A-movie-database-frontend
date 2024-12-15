import { Injectable } from '@angular/core';

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

    hasMovieRating(id: number){
      return this.#getItem('movie-' + id) !== null;
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

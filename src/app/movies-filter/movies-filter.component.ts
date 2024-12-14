import { HttpClient } from '@angular/common/http';
import { Component, inject, output, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WatchProvider } from '../interfaces/watch-provider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'movies-filter',
  imports: [FormsModule],
  templateUrl: './movies-filter.component.html',
  styleUrl: './movies-filter.component.css'
})
export class MoviesFilterComponent {

  filter = output<number[]>();
  http = inject(HttpClient);
  moviesService = inject(MoviesService);
  watchProviders = signal<WatchProvider[]>([]);

  selectedProviders: number[] = []; //with_watch_providers: 1|2|55

  constructor(){
    this.moviesService.getWatchProviders().pipe(takeUntilDestroyed()).subscribe({
      next: (watchProviders) => {
        this.watchProviders.set(watchProviders);
      }
    })
  }

  applyFilters() :void {
    this.filter.emit(this.selectedProviders);
  }

  updateSelection(event: Event, watchProvider: WatchProvider) {    
    if ((event.target! as HTMLInputElement).checked!) {
      this.selectedProviders.push(watchProvider.id);
    } else {
      this.selectedProviders.splice(this.selectedProviders.indexOf(watchProvider.id), 1);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { FilterParams } from '../../../interfaces/filter-params';
import { WatchProvider } from '../../../interfaces/watch-provider';
import { MoviesService } from '../../../services/movies.service';


@Component({
    selector: 'movies-filter',
    imports: [FormsModule, KeyValuePipe],
    templateUrl: './movies-filter.component.html',
    styleUrl: './movies-filter.component.css',
})
export class MoviesFilterComponent {
    filter = output<FilterParams>();
    http = inject(HttpClient);
    moviesService = inject(MoviesService);
    watchProviders = signal<WatchProvider[]>([]);
    watchMonetizationTypes = new Map([
        ['flatrate', 'Tarifa plana'],
        ['free', 'Gratis'],
        ['ads', 'Con anuncios'],
        ['rent', 'Alquilar'],
        ['buy', 'Comprar'],
    ]);

    selectedProviders: number[] = []; //with_watch_providers: 1|2|55
    selectedMonetizationTypes: string[] = []; //with_watch_providers: 1|2|55

    constructor() {
        this.moviesService
            .getWatchProviders()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (watchProviders) => {
                    this.watchProviders.set(watchProviders);
                },
            });
    }

    applyFilters(): void {
        const filterParams: FilterParams = {
            watchProviders: this.selectedProviders,
            watchMonetizationTypes: this.selectedMonetizationTypes,
        };
        this.filter.emit(filterParams);
    }

    updateSelectedProvider(event: Event, watchProvider: WatchProvider): void {
        if ((event.target! as HTMLInputElement).checked!) {
            this.selectedProviders.push(watchProvider.id);
        } else {
            this.selectedProviders.splice(
                this.selectedProviders.indexOf(watchProvider.id),
                1
            );
        }
    }

    updateSelectedMonetizationType(
        event: Event,
        monetizationType: string
    ): void {
        if ((event.target! as HTMLInputElement).checked!) {
            this.selectedMonetizationTypes.push(monetizationType);
        } else {
            this.selectedMonetizationTypes.splice(
                this.selectedMonetizationTypes.indexOf(monetizationType),
                1
            );
        }
    }
}

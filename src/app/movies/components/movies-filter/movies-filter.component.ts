import { Component, inject, output, signal } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { FilterParams } from '../../../interfaces/filter-params';
import { WatchProvider } from '../../../interfaces/watch-provider';
import { MoviesService } from '../../../services/movies.service';
import { KeyValuePipe } from '@angular/common';
import { Genre } from '../../../interfaces/genre';
import { RegionSelectComponent } from '../region-select/region-select.component';

@Component({
    selector: 'movies-filter',
    imports: [FormsModule, KeyValuePipe, RegionSelectComponent],
    templateUrl: './movies-filter.component.html',
    styleUrl: './movies-filter.component.css',
})
export class MoviesFilterComponent {
    moviesService = inject(MoviesService);

    filter = output<FilterParams>();

    movieGenres = signal<Genre[]>([]);
    regions = signal<string[]>([]);

    //made a signal because it updates the watchProviders resource
    selectedRegion = signal('GB');

    //stores all watch providers of the selected region
    watchProviders = rxResource({
        request: () => this.selectedRegion(),
        loader: (params) => {
            return this.moviesService.getWatchProviders(params.request);
        },
    });
   
    watchMonetizationTypes = new Map([
        ['flatrate', 'Flat rate'],
        ['free', 'Free'],
        ['ads', 'Ads'],
        ['rent', 'Rent'],
        ['buy', 'Buy'],
    ]);

    orderByOptions = new Map([
        ['popularity.desc', 'Most popular'],
        ['popularity.asc', 'Least popular'],
        ['vote_average.desc', 'Highest vote average'],
        ['vote_average.asc', 'Lowest vote average'],
        ['primary_release_date.desc', 'Most recent'],
        ['primary_release_date.asc', 'Older'],
        ['title.desc', 'Ttile (A-Z)'],
        ['title.asc', 'Title (Z-A)'],
    ]);

    filterParams: FilterParams = {
        watchProviders: [],
        watchRegion: this.selectedRegion(),
        watchMonetizationTypes: [],
        selectedGenres: [],
        orderBy: 'popularity.desc'
    }

    constructor() {
        //get all regions with watch provider info
        this.moviesService
            .getRegions()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (regions) => {
                    this.regions.set(regions);
                },
            });

        //get all genres
        this.moviesService
            .getMovieGenres()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (movieGenres) => {
                    this.movieGenres.set(movieGenres);
                },
            });
    }

    applyFilters(): void {
        this.filter.emit(this.filterParams);
    }

    updateSelectedProvider(event: Event, watchProvider: WatchProvider): void {
        if ((event.target! as HTMLInputElement).checked!) {
            this.filterParams.watchProviders.push(watchProvider.id);
        } else {
            this.filterParams.watchProviders.splice(this.filterParams.watchProviders.indexOf(watchProvider.id), 1);
        }
    }

    updateSelectedMonetizationType(event: Event, monetizationType: string): void {
        if ((event.target! as HTMLInputElement).checked!) {
            this.filterParams.watchMonetizationTypes.push(monetizationType);
        } else {
            this.filterParams.watchMonetizationTypes.splice(this.filterParams.watchMonetizationTypes.indexOf(monetizationType), 1);
        }
    }

    updateSelectedGenre(event: Event, genre: Genre) {
        if ((event.target! as HTMLInputElement).checked!) {
            this.filterParams.selectedGenres.push(genre.id);
        } else {
            this.filterParams.selectedGenres.splice(this.filterParams.selectedGenres.indexOf(genre.id), 1);
        }
    }

    updateSelectedRegion(region: string) {
        this.selectedRegion.set(region);

        this.filterParams.watchRegion = region;
        this.filterParams.watchProviders = [];
    }

    // Preserve original property order in the keyvalue pipe
    originalOrder = (): number => {
        return 0;
    };
}

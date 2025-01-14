import { inject, Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Genre } from '../interfaces/genre';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { WatchProvidersByRate, WatchProvidersRate } from '../interfaces/watch-providers-by-rate';
import { MoviesPagination } from '../interfaces/movies-pagination';
import { GenresResponse } from '../interfaces/responses/genres-response';
import { MoviesPaginationResponse } from '../interfaces/responses/movies-pagination-response';
import { SingleMovieResponse } from '../interfaces/responses/single-movie-response';
import { WatchProvider } from '../interfaces/watch-provider';
import { FilterParams } from '../interfaces/filter-params';
import { SingleWatchProviderResponse, WatchProvidersResponse } from '../interfaces/responses/media-watch-providers-response';
import { AllWatchProvidersResponse } from '../interfaces/responses/watch-providers-response';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    #apiKey = environment.apiKey;

    //URLS
    baseUrl = 'https://api.themoviedb.org/3';

    //movies
    moviesUrl = this.baseUrl + '/discover/movie';
    moviesTitleUrl = this.baseUrl + '/search/movie';
    movieDetailUrl = this.baseUrl + '/movie';

    //genres
    genresUrl = this.baseUrl + '/genre/movie/list';

    //watch providers
    watchProvidersUrl = this.baseUrl + '/watch/providers/movie';

    //region and language defaults
    language = 'es-ES';
    region = 'es-ES';
    watchProviderRegion = 'ES';

    //inject http service
    http = inject(HttpClient);

    //get movies filtered by the specified options. Defaults to no filters.
    getMovies(page = 1, filterOptions: FilterParams | null = null): Observable<MoviesPagination> {
        const headers = this.#getAuthHeaders();
        let filterParams = new HttpParams();
        if (filterOptions !== null) {
            filterParams = this.getFilterParams(filterOptions);
        }

        filterParams = filterParams.set('watch_region', 'ES'); //with_watch_providers: 1|2|55

        //set default filterOptions
        filterParams = filterParams.set('language', this.language).set('region', this.region);
        filterParams = filterParams.set('page', page);

        return this.http
            .get<MoviesPaginationResponse>(this.moviesUrl, {
                headers,
                params: filterParams,
            })
            .pipe(
                map<MoviesPaginationResponse, MoviesPagination>((response) => {
                    return {
                        page: response.page,
                        results: response.results.map(this.#mapSingleMovieResponseToMovie),
                        totalPages: response.total_pages,
                        totalResults: response.total_results,
                    };
                })
            );
    }

    getRandomMovieId(): Observable<number> {
        const maxPages = 500; //API imposes a max of 500 for some reason
        const randomPage = Math.floor(Math.random() * (maxPages - 1 + 1)) + 1;
        return this.getMovies(randomPage)
            .pipe(
                map((moviePagination) => {
                    const totalMovies = moviePagination.results.length;
                    const randomMovie = Math.floor(Math.random() * (totalMovies - 1 + 1));
                    return moviePagination.results[randomMovie].id!;
                })
            )
    }

    getFilterParams(filterOptions: FilterParams): HttpParams {
        let filterParams = new HttpParams().set('sort_by', filterOptions.orderBy);
        if (filterOptions.watchMonetizationTypes.length > 0) {
            filterParams = filterParams.set('with_watch_monetization_types', filterOptions.watchMonetizationTypes.join('|'));
        }
        if (filterOptions.watchProviders.length > 0) {
            filterParams = filterParams.set('with_watch_providers', filterOptions.watchProviders.join('|'));
        }
        if (filterOptions.selectedGenres.length > 0) {
            filterParams = filterParams.set('with_genres', filterOptions.selectedGenres.join(','));
        }
        return filterParams;
    }

    getMoviesByTitle(title: string): Observable<MoviesPagination> {
        const headers = this.#getAuthHeaders();
        const params = new HttpParams().set('query', title).set('language', this.language).set('region', this.region);

        return this.http
            .get<MoviesPaginationResponse>(this.moviesTitleUrl, {
                headers,
                params,
            })
            .pipe(
                map<MoviesPaginationResponse, MoviesPagination>((response) => {
                    return {
                        page: response.page,
                        results: response.results.map(this.#mapSingleMovieResponseToMovie),
                        totalPages: response.total_pages,
                        totalResults: response.total_results,
                    };
                })
            );
    }

    getMovie(id: number): Observable<Movie> {
        const headers = this.#getAuthHeaders();

        const params = new HttpParams().set('append_to_response', 'watch/providers').set('language', this.language);
        return this.http
            .get<SingleMovieResponse>(this.movieDetailUrl + '/' + id, {
                headers,
                params,
            })
            .pipe(
                map<SingleMovieResponse, Movie>((response) => {
                    const movie = this.#mapSingleMovieResponseToMovie(response);
                    movie.watchProviders = this.#mapWatchProviders(response['watch/providers']!);
                    return movie;
                })
            );
    }

    getMovieGenres(): Observable<Genre[]> {
        const headers = this.#getAuthHeaders();
        const params = new HttpParams().set('language', this.language);
        return this.http
            .get<GenresResponse>(this.genresUrl, {
                headers,
                params,
            })
            .pipe(
                map<GenresResponse, Genre[]>((response) => {
                    return response.genres;
                })
            );
    }

    getWatchProviders(): Observable<WatchProvider[]> {
        const headers = this.#getAuthHeaders();
        const params = new HttpParams().set('language', this.language).set('watch_region', this.watchProviderRegion);
        return this.http
            .get<WatchProvidersResponse>(this.watchProvidersUrl, {
                headers,
                params,
            })
            .pipe(
                map<WatchProvidersResponse, WatchProvider[]>((watchProvidersResponse) => {
                    return watchProvidersResponse.results.map(this.#mapWatchProviderResponseToWatchProvider);
                })
            );
    }

    #getAuthHeaders(): HttpHeaders {
        return new HttpHeaders().set('Accept', 'application/json').set('Authorization', `Bearer ${this.#apiKey}`);
    }

    #mapWatchProviders(wpResponse: AllWatchProvidersResponse): WatchProvidersByRate {
        const results = wpResponse.results;

        const watchProvidersByRate: WatchProvidersByRate = {
            rates: [],
            countryLinks: new Map<string, string>(),
        };

        const rentWatchProviders: WatchProvidersRate = {
            rate: 'rent',
            countries: new Map<string, WatchProvider[]>(),
        };

        const flatrateWatchProviders: WatchProvidersRate = {
            rate: 'flatrate',
            countries: new Map<string, WatchProvider[]>(),
        };

        const buyWatchProviders: WatchProvidersRate = {
            rate: 'buy',
            countries: new Map<string, WatchProvider[]>(),
        };

        const adsWatchProviders: WatchProvidersRate = {
            rate: 'ads',
            countries: new Map<string, WatchProvider[]>(),
        };

        const freeWatchProviders: WatchProvidersRate = {
            rate: 'free',
            countries: new Map<string, WatchProvider[]>(),
        };

        for (const [countryCode, countryInfo] of Object.entries(results)) {
            //add country link to array
            watchProvidersByRate.countryLinks.set(countryCode, countryInfo.link);

            if (countryInfo.rent !== undefined) {
                rentWatchProviders.countries.set(countryCode, countryInfo.rent.map(this.#mapWatchProviderResponseToWatchProvider));
            }

            if (countryInfo.flatrate !== undefined) {
                flatrateWatchProviders.countries.set(countryCode, countryInfo.flatrate.map(this.#mapWatchProviderResponseToWatchProvider));
            }

            if (countryInfo.buy !== undefined) {
                buyWatchProviders.countries.set(countryCode, countryInfo.buy.map(this.#mapWatchProviderResponseToWatchProvider));
            }

            if (countryInfo.ads !== undefined) {
                adsWatchProviders.countries.set(countryCode, countryInfo.ads.map(this.#mapWatchProviderResponseToWatchProvider));
            }

            if (countryInfo.free !== undefined) {
                freeWatchProviders.countries.set(countryCode, countryInfo.free.map(this.#mapWatchProviderResponseToWatchProvider));
            }
        }
        watchProvidersByRate.rates.push(rentWatchProviders);
        watchProvidersByRate.rates.push(freeWatchProviders);
        watchProvidersByRate.rates.push(adsWatchProviders);
        watchProvidersByRate.rates.push(buyWatchProviders);
        watchProvidersByRate.rates.push(flatrateWatchProviders);
        return watchProvidersByRate;
    }

    //map movies pagination response to the app's movies pagination interface
    #mapSingleMovieResponseToMovie(movieResponse: SingleMovieResponse): Movie {
        const movie: Movie = {
            id: movieResponse.id,
            title: movieResponse.title,
            overview: movieResponse.overview,
            runtime: movieResponse.runtime,
            popularity: movieResponse.popularity,
            voteAverage: movieResponse.vote_average,
            voteCount: movieResponse.vote_count,
            backdropPath: movieResponse.backdrop_path, //url to image
            posterPath: movieResponse.poster_path,
            releaseDate: movieResponse.release_date, //"2024-10-09"
            status: movieResponse.status, //"status": "Released",
            userRating: 0,
        };
        if (movieResponse.genre_ids !== undefined) {
            movie.genre_ids = movieResponse.genre_ids;
        }
        if (movieResponse.genres !== undefined) {
            movie.genres = movieResponse.genres;
        }
        return movie;
    }

    //map a single Watch Provider api response to the app's WatchProvider interface
    #mapWatchProviderResponseToWatchProvider(wpResponse: SingleWatchProviderResponse): WatchProvider {
        return {
            id: wpResponse.provider_id,
            providerName: wpResponse.provider_name,
            displayPriority: wpResponse.display_priority,
            logoPath: wpResponse.logo_path,
        };
    }
}

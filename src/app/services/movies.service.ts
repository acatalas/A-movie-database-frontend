import { inject, Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Genre } from '../interfaces/genre';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MoviesPaginationResponse } from '../interfaces/movies-pagination-response';
import { SingleMovieResponse } from '../interfaces/single-movie-response';
import { MoviesPagination } from '../interfaces/movies-pagination';
import { GenresResponse } from '../interfaces/genres-response';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    #apiKey = environment.apiKey;
    baseUrl = 'https://api.themoviedb.org/3';
    moviesUrl = this.baseUrl + '/discover/movie';
    moviesTitleUrl = this.baseUrl + '/search/movie';
    movieDetailUrl = this.baseUrl + '/movie';
    genresUrl = this.baseUrl + '/genre/movie/list';
    language = 'es-ES';
    region = 'es-ES';

    //inject http service
    http = inject(HttpClient);

    //get movies filtered by the specified options. Defaults to no filters.
    getMovies(
        filterOptions: HttpParams = new HttpParams()
    ): Observable<MoviesPagination> {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${this.#apiKey}`,
        };
        filterOptions = filterOptions
            .set('language', this.language)
            .set('region', this.region);

        return this.http
            .get<MoviesPaginationResponse>(this.moviesUrl, {
                headers,
                params: filterOptions,
            })
            .pipe(
                map<MoviesPaginationResponse, MoviesPagination>((response) => {
                    return {
                        page: response.page,
                        results: response.results.map((movieResponse) => {
                            return {
                                id: movieResponse.id,
                                title: movieResponse.title,
                                genre_ids: movieResponse.genre_ids,
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
                        }),
                        totalPages: response.total_pages,
                        totalResults: response.total_results,
                    };
                })
            );
    }

    getMoviesByTitle(title: string): Observable<MoviesPagination> {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${this.#apiKey}`,
        };
        const params = new HttpParams()
            .set('query', title)
            .set('language', this.language)
            .set('region', this.region);

        return this.http
            .get<MoviesPaginationResponse>(this.moviesTitleUrl, {
                headers,
                params,
            })
            .pipe(
                map<MoviesPaginationResponse, MoviesPagination>((response) => {
                    return {
                        page: response.page,
                        results: response.results.map((movieResponse) => {
                            console.log(movieResponse);
                            return {
                                id: movieResponse.id,
                                title: movieResponse.title,
                                genre_ids: movieResponse.genre_ids,
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
                        }),
                        totalPages: response.total_pages,
                        totalResults: response.total_results,
                    };
                })
            );
    }

    getMovie(id: number): Observable<Movie> {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${this.#apiKey}`,
        };
        return this.http
            .get<SingleMovieResponse>(this.movieDetailUrl + '/' + id, {
                headers,
            })
            .pipe(
                map<SingleMovieResponse, Movie>((response) => {
                    return {
                        id: response.id,
                        title: response.title,
                        genres: response.genres,
                        overview: response.overview,
                        runtime: response.runtime,
                        popularity: response.popularity,
                        voteAverage: response.vote_average,
                        voteCount: response.vote_count,
                        backdropPath: response.backdrop_path, //url to image
                        posterPath: response.poster_path,
                        releaseDate: response.release_date, //"2024-10-09"
                        status: response.status, //"status": "Released",
                        userRating: 0,
                    };
                })
            );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addMovie(movie: Movie): void {
        //this.movies.push(movie);
    }

    changeRating(id: number, newRating: number): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const hello = id + newRating;
    }

    getGenres(): Observable<Genre[]> {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${this.#apiKey}`,
        };
        const params = new HttpParams().set("language", this.language);
        return this.http
            .get<GenresResponse>(this.genresUrl, {
                headers, params
            })
            .pipe(
                map<GenresResponse, Genre[]>((response) => {
                    return response.genres;
                })
            );
    }
}

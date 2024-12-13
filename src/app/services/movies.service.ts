import { inject, Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Genre } from '../interfaces/genre';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MoviesPaginationResponse } from '../interfaces/movies-pagination-response';
import { SingleMovieResponse } from '../interfaces/single-movie-response';
import { MoviesPagination } from '../interfaces/movies-pagination';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    #apiKey = environment.apiKey;
    moviesUrl = 'https://api.themoviedb.org/3/discover/movie';
    moviesTitleUrl = 'https://api.themoviedb.org/3/search/movie';
    movieDetailUrl = 'https://api.themoviedb.org/3/movie';
    http = inject(HttpClient);

    getMovies(
        filterOptions: HttpParams = new HttpParams()
    ): Observable<MoviesPagination> {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${this.#apiKey}`,
        };
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
                                posterPath:
                                    'https://image.tmdb.org/t/p/w500' +
                                    movieResponse.poster_path,
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
        const params = {
            query: title,
        };
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
                                posterPath:
                                    'https://image.tmdb.org/t/p/w500' +
                                    movieResponse.poster_path,
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
                        posterPath:
                            'https://image.tmdb.org/t/p/w500' +
                            response.poster_path,
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

    getGenres(): Genre[] {
        return [
            {
                id: 28,
                name: 'Acción',
            },
            {
                id: 12,
                name: 'Aventura',
            },
            {
                id: 16,
                name: 'Animación',
            },
            {
                id: 35,
                name: 'Comedia',
            },
            {
                id: 80,
                name: 'Crimen',
            },
            {
                id: 99,
                name: 'Documental',
            },
            {
                id: 18,
                name: 'Drama',
            },
            {
                id: 10751,
                name: 'Familia',
            },
            {
                id: 14,
                name: 'Fantasía',
            },
            {
                id: 36,
                name: 'Historia',
            },
            {
                id: 27,
                name: 'Terror',
            },
            {
                id: 10402,
                name: 'Música',
            },
            {
                id: 9648,
                name: 'Misterio',
            },
            {
                id: 10749,
                name: 'Romance',
            },
            {
                id: 878,
                name: 'Ciencia ficción',
            },
            {
                id: 10770,
                name: 'Película de TV',
            },
            {
                id: 53,
                name: 'Suspense',
            },
            {
                id: 10752,
                name: 'Bélica',
            },
            {
                id: 37,
                name: 'Western',
            },
        ];
    }
}

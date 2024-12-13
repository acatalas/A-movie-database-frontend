import { Genre } from "./genre";

export interface SingleMovieResponse {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: number[];
    genres?: Genre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

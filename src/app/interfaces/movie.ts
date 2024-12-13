import { Genre } from "./genre";

export interface Movie {
    id?: number;
    title: string;
    genres?: Genre[];
    genre_ids?: number[];
    overview: string;
    runtime: number;
    popularity: number;
    voteAverage: number;
    voteCount: number;
    backdropPath: string | null; //url to image
    posterPath: string | null;
    releaseDate: string; //"2024-10-09"
    status: string; //"status": "Released",
    userRating: number;
}

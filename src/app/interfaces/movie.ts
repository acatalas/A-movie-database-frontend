import { Genre } from "./genre";

export interface Movie {
    id?: number;
    title: string;
    genres: Genre[];
    overview: string;
    runtime: number;
    popularity: number;
    voteAverage: number;
    voteCount: number;
    backdropPath: string; //url to image
    posterPath: string;
    releaseDate: string; //"2024-10-09"
    status: string; //"status": "Released",
}

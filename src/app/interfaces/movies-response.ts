import { SingleMovieResponse } from "./single-movie-response";

export interface MoviesResponse {
    page: number,
    results: SingleMovieResponse[],
    total_pages: number,
    total_results: number
}

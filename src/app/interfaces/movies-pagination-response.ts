import { SingleMovieResponse } from "./single-movie-response";

export interface MoviesPaginationResponse {
    page: number,
    results: SingleMovieResponse[],
    total_pages: number,
    total_results: number
}

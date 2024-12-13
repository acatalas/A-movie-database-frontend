import { Movie } from "./movie";

export interface MoviesPagination {
    page: number,
    results: Movie[],
    totalPages: number,
    totalResults: number
}

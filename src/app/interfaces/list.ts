import { Movie } from "./movie";

export interface List {
    id?: number;
    title: string; //binds to name
    description: string;
    movies: Movie[];
    favoriteCount: number;
    itemCount: number;
    listType: string;
    posterPath: string | null;
}

export interface List {
    id?: number;
    title: string; //binds to name
    description: string;
    favoriteCount: number;
    itemCount: number;
    listType: string;
    posterPath: string | null;
}

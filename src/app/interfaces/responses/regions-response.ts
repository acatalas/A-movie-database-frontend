export interface RegionsResponse {
    results: RegionResponse[];
}

export interface RegionResponse {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
}

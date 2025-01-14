/**
 * Represents the response for a petition on all watch providers on the platform.
 */
export interface WatchProvidersResponse {
    results: SingleWatchProviderResponse[];
}

export interface SingleWatchProviderResponse {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
}

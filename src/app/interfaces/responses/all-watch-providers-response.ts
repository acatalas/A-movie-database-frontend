import { SingleWatchProviderResponse } from "./single-watch-provider-response";

export interface AllWatchProvidersResponse {
    results: WatchProvidersByCountry;
}

type WatchProvidersByCountry = Record<
    string,
    {
        link: string;
        buy?: SingleWatchProviderResponse[];
        rent?: SingleWatchProviderResponse[];
        ads?: SingleWatchProviderResponse[];
        flatrate?: SingleWatchProviderResponse[];
        free?: SingleWatchProviderResponse[];
    }
>;

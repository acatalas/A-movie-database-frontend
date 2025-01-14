/**
 * Maps all the watch providers of a given media response. The watch providers use the country code as a key for all that country's watch
 * provider data.
 * Ex: "results": {
      "BE": {
        "link": "...",
        "free": SingleWatchProviderResponse[]
      },
      "ES": {...}
 */

import { SingleWatchProviderResponse } from "./media-watch-providers-response";

export interface AllWatchProvidersResponse {
    results: WatchProvidersByCountryResponse;
}

/**
 * Record to map the country codes the watch providers info
 */
type WatchProvidersByCountryResponse = Record<string, CountryWatchProviders>;

interface CountryWatchProviders {
    link: string;
    buy?: SingleWatchProviderResponse[];
    rent?: SingleWatchProviderResponse[];
    ads?: SingleWatchProviderResponse[];
    flatrate?: SingleWatchProviderResponse[];
    free?: SingleWatchProviderResponse[];
}




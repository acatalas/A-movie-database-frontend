import { WatchProvider } from "./watch-provider";

export interface WatchProvidersByRate {
    rent: Map<string, WatchProvider[]>; //will map the country code ("ES") to a list of watchProviders that offer that service at that rate in that region
    flatrate: Map<string, WatchProvider[]>;
    buy: Map<string, WatchProvider[]>;
    ads: Map<string, WatchProvider[]>;
    free: Map<string, WatchProvider[]>;
    countryLinks: Map<string, string>; //will map country code to tmdb link
}

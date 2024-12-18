import { WatchProvider } from './watch-provider';

export interface WatchProvidersByRate {
    rates: WatchProvidersRate[];
    countryLinks: Map<string, string>; //will map country code to tmdb link
}

export interface WatchProvidersRate {
    rate: string;
    countries: Map<string, WatchProvider[]>;
}

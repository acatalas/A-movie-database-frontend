import { Component, computed, input, signal } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntlRegionPipe } from '../../../pipes/intl-region.pipe';
import { WatchProvidersByRate, WatchProvidersRate } from '../../../interfaces/watch-providers-by-rate';
import { WatchProvider } from '../../../interfaces/watch-provider';

@Component({
    selector: 'watch-providers',
    imports: [KeyValuePipe, IntlRegionPipe, FormsModule],
    templateUrl: './watch-providers.component.html',
    styleUrl: './watch-providers.component.css',
})
export class WatchProvidersComponent {
    watchProviders = input<WatchProvidersByRate>();
    selectedRateType = signal<string>('free');
    selectedCountry = signal<string>('all');

    watchRateTypes = new Map([
        ['free', 'Gratis'],
        ['flatrate', 'Retransmisión'],
        ['ads', 'Anuncios'],
        ['rent', 'Alquiler'],
        ['buy', 'Compra'],
    ]);

    filteredRates = computed(() => {
        console.log(this.selectedRateType())
        const rate = this.selectedRateType();
        const rateProviders = this.getProvidersByRate(rate);
        return rateProviders;
    });

    filteredCountries = computed<Map<string, WatchProvider[]>>(() => {
        const rate = this.selectedRateType();
        const country = this.selectedCountry();
        const rateProviders = this.getProvidersByRate(rate);
        //return all countries
        if (country === 'all') {
            console.log(rateProviders!.countries);
            return rateProviders!.countries;
        }
        return new Map([[country, rateProviders!.countries.get(country)!]]);
    });

    getProvidersByRate(rate: string): WatchProvidersRate | null {
        return this.watchProviders()?.rates.find((wpRate) => wpRate.rate === rate) || null;
    }

    changeRate(): void {
        this.selectedCountry.set('all');
    }
}

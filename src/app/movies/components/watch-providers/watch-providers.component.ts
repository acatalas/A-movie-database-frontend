import { Component, computed, input, signal, effect } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntlRegionPipe } from '../../../pipes/intl-region.pipe';
import { WatchProvidersByRate, WatchProvidersRate } from '../../../interfaces/watch-providers-by-rate';

@Component({
    selector: 'watch-providers',
    imports: [KeyValuePipe, IntlRegionPipe, FormsModule],
    templateUrl: './watch-providers.component.html',
    styleUrl: './watch-providers.component.css',
})
export class WatchProvidersComponent {
    watchProviders = input<WatchProvidersByRate>();
    selectedRateType = signal<string>('free');

    watchRateTypes = new Map([
        ['free', 'Gratis'],
        ['flatrate', 'Tarifa plana'],
        ['ads', 'Con anuncios'],
        ['rent', 'Alquilar'],
        ['buy', 'Comprar'],
    ]);

    filteredRates = computed(() => {
        const rate = this.selectedRateType();
        return this.getProvidersByRate(rate);
    });

    constructor() {
        //load the providers count
        effect(() => {
            for (const [rate, rateName] of this.watchRateTypes) {
                const wpRate = this.getProvidersByRate(rate);

                if (wpRate !== null) {
                    this.watchRateTypes.set(
                        rate,
                        rateName + ' (' + wpRate.countries.size + ')'
                    );
                }
            }
        });
    }

    getProvidersByRate(rate: string): WatchProvidersRate | null {
        return (
            this.watchProviders()?.rates.find(
                (wpRate) => wpRate.rate === rate
            ) || null
        );
    }

    changeRate(event: Event): void {
        const rate = (event.target! as HTMLInputElement).value;
        this.selectedRateType.set(rate);
    }
}

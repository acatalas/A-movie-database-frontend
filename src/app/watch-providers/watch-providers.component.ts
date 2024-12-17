import { Component, input } from '@angular/core';
import { WatchProvidersByRate } from '../interfaces/watch-providers-by-rate';
import { KeyValuePipe } from '@angular/common';
import { IntlRegionPipe } from '../pipes/intl-region.pipe';

@Component({
    selector: 'watch-providers',
    imports: [KeyValuePipe, IntlRegionPipe],
    templateUrl: './watch-providers.component.html',
    styleUrl: './watch-providers.component.css',
})
export class WatchProvidersComponent {
    watchProviders = input<WatchProvidersByRate>();
    watchMonetizationTypes = new Map([
        ['flatrate', 'Tarifa plana'],
        ['free', 'Gratis'],
        ['ads', 'Con anuncios'],
        ['rent', 'Alquilar'],
        ['buy', 'Comprar'],
    ]);
    selectedMonetizationType = 'free';
}

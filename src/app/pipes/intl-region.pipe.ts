import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'intlRegion',
})
export class IntlRegionPipe implements PipeTransform {
    transform(region: string, locale: string): string {
        try {
            const regionNames = new Intl.DisplayNames([locale], {
                type: 'region',
            });
            return regionNames.of(region) || region;
        } catch (error) {
            console.log(error);
            return region;
        }
    }
}

import { Component, computed, input, model } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'region-select',
    imports: [KeyValuePipe, FormsModule],
    templateUrl: './region-select.component.html',
    styleUrl: './region-select.component.css',
})
export class RegionSelectComponent {
    //stores a list of region codes
    regionCodes = input.required<string[]>();

    //stores the region code so it can be emitted to parent component
    region = model.required<string>();

    regionFilter = model<string>('');

    //maps the region codes to a region code -> region name.
    regionCodesMap = computed(() => {
        return this.getRegionCodesMap(this.regionCodes(), this.regionFilter());
    });

    //stores the translated name of the selected region in specified locale
    selectedRegion = computed(() => {
        return this.getRegionName(this.region(), this.defaultLocale)
    })

    defaultLocale = 'EN-UK';

    //returns a map with the region codes as the key, and the translated region name as a value
    getRegionCodesMap(regionCodes: string[], filter: string): Map<string, string> {
        const regionCodesMap = new Map<string, string>();
        for (const regionCode of regionCodes) {
            const regionName = this.getRegionName(regionCode, this.defaultLocale);
            if(regionName.toLowerCase().includes(filter.toLowerCase())){
                regionCodesMap.set(regionCode, regionName);
            }
        }
        return this.sortRegionCodesMap(regionCodesMap);
    }

    /**
     * Sorts the region code map in alphabetical order of the region name
     *  */
    sortRegionCodesMap(regionCodesMap: Map<string, string>): Map<string, string> {
        return new Map([...regionCodesMap.entries()].sort((a, b) => a[1].localeCompare(b[1])));
    }

    getRegionName(regionCode: string, locale: string): string {
        try {
            const regionNames = new Intl.DisplayNames([locale], {
                type: 'region',
            });
            return regionNames.of(regionCode) || regionCode;
        } catch (error) {
            console.error(error);
            return regionCode;
        }
    }

    selectRegion(regionCode: string) {
        this.region.set(regionCode);
    }

    // Preserve original property order in the keyvalue pipe
    originalOrder = (): number => {
        return 0;
    };
}

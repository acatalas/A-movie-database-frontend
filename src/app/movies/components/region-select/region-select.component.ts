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
    regionCodes = input.required<string[]>();
    region = model.required<string>();
    regionCodesMap = computed(() => {
        return this.getRegionCodesMap(this.regionCodes());
    });

    //returns a map with the region codes as the key, and the translated region name as a value
    getRegionCodesMap(regionCodes: string[]): Map<string, string> {
        const regionCodesMap = new Map<string, string>();
        for (const regionCode of regionCodes) {
            regionCodesMap.set(regionCode, this.getRegionName(regionCode, 'EN-UK'));
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

    // Preserve original property order in the keyvalue pipe
    originalOrder = (): number => {
        return 0;
    };
}

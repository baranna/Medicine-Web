import { Component, Input, OnInit } from '@angular/core';
import { FrequencyTypes } from '../../core/model/FrequencyType';
import { SideEffect } from '../model/SideEffect';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: [ './product-item.component.scss' ],
})
export class ProductItemComponent implements OnInit {

    @Input() sideEffects: SideEffect[];

    sortedEffects: any;

    constructor() {
    }

    ngOnInit(): void {
        this.sortedEffects = {};
        for (const effect of this.sideEffects) {
            const frequencyNumber = Number(effect.frequency.slice(0, -1));
            if (!isNaN(frequencyNumber)) {
                // @ts-ignore
                effect.frequencyNumber = frequencyNumber;
                // @ts-ignore
                effect.frequencyType = FrequencyTypes[Math.floor((effect.frequencyNumber / 100) * 8)];
            }
            if (effect.frequency === 'postmarketing' || FrequencyTypes.includes(effect.frequency)) {
                // @ts-ignore
                effect.frequencyType = effect.frequency;
            }
            // @ts-ignore
            if (this.sortedEffects[effect.frequencyType] === undefined) {
                // @ts-ignore
                this.sortedEffects[effect.frequencyType] = [ effect ];
            } else {
                // @ts-ignore
                this.sortedEffects[effect.frequencyType].push(effect);
            }
        }

        this.sortedEffects = (Object as any).fromEntries(
            Object.entries(this.sortedEffects)
                .map(
                    ([ key, value ]) => {
                        const sorted = (value as any).sort((a, b) => (b?.frequencyNumber ?? 0) - (a?.frequencyNumber ?? 1));
                        return [ key, sorted ];
                    },
                ),
        );
    }
}


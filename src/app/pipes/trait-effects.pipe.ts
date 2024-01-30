import { ClassProvider, Pipe, PipeTransform } from "@angular/core";
import { TraitLevel } from "../lib";

export function provideTraitEffectsPipe(): ClassProvider {
    return {
        provide: TraitEffectsPipe,
        useClass: TraitEffectsPipe,
        multi: false,
    };
}

@Pipe({
    name: "traitEffects",
    standalone: true
})
export class TraitEffectsPipe implements PipeTransform {

    transform(effects: TraitLevel["effects"]): string {
        return Object.keys(effects).map(effectName => {
            const effectValue = effects[effectName];
            const prefix = `${effectValue > 0 ? "+" : ""}`
            return `${prefix}${effectValue} ${effectName}`;
        }).join(", ");
    }

}

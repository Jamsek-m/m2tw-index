import { inject, Pipe, PipeTransform } from "@angular/core";
import { Trait } from "../lib";
import { TraitEffectsPipe } from "./trait-effects.pipe";

@Pipe({
    name: "maxEffect",
    standalone: true,
})
export class MaxEffectPipe implements PipeTransform {

    private traitEffectsPipe = inject(TraitEffectsPipe);

    transform(trait: Trait): string {
        if (trait.levels.length > 0) {
            const maxLevel = trait.levels[trait.levels.length - 1];
            return this.traitEffectsPipe.transform(maxLevel.effects);
        }
        return "";
    }

}

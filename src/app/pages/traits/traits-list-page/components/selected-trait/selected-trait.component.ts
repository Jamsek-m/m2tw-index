import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Trait } from "../../../../../lib";
import { TraitEffectsPipe } from "../../../../../pipes/trait-effects.pipe";

@Component({
    selector: "app-selected-trait",
    standalone: true,
    imports: [
        TraitEffectsPipe
    ],
    templateUrl: "./selected-trait.component.html",
    styleUrl: "./selected-trait.component.scss"
})
export class SelectedTraitComponent {

    @Input()
    public trait: Trait;

    @Output()
    public whenClearedTrait = new EventEmitter<void>();

    @Output()
    public whenAntitraitSelected = new EventEmitter<string>();

    public copyTraitId(levelId: number) {
        const content = `${this.trait.name} ${levelId}`;
        navigator.clipboard.writeText(content);
    }

}

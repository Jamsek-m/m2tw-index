import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EffectsService, TraitService } from "../../../services";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, combineLatest, map, Observable, startWith, switchMap } from "rxjs";
import { Trait } from "../../../lib";
import { PageLayoutComponent } from "../../../layouts/page-layout/page-layout.component";
import { TraitEffectsPipe } from "../../../pipes/trait-effects.pipe";
import { SelectedTraitComponent } from "./components/selected-trait/selected-trait.component";
import { AutocompleteComponent } from "../../../component/autocomplete/autocomplete.component";
import { AutocompleteRow } from "../../../component/autocomplete/types";
import { MaxEffectPipe } from "../../../pipes/max-effect.pipe";
import { MaxLevelPipe } from "../../../pipes/max-level.pipe";


@Component({
    selector: 'app-traits-list-page',
    standalone: true,
    imports: [
        AsyncPipe,
        PageLayoutComponent,
        TraitEffectsPipe,
        MaxEffectPipe,
        JsonPipe,
        SelectedTraitComponent,
        AutocompleteComponent,
        MaxLevelPipe,
    ],
    templateUrl: './traits-list-page.component.html',
    styleUrl: './traits-list-page.component.scss'
})
export class TraitsListPageComponent implements OnInit {

    private readonly EFFECT_QUERY_PARAM = "effect";
    private readonly TRAIT_QUERY_PARAM = "trait";
    private readonly DIR_QUERY_PARAM = "dir";

    private traitsService = inject(TraitService);
    private effectsService = inject(EffectsService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    protected readonly Object = Object;

    public selectedTrait$ = new BehaviorSubject<Trait | null>(null);

    private effectFilter$: Observable<string | undefined> = this.route.queryParams.pipe(
        startWith(this.route.snapshot.queryParams),
        map((params) => params[this.EFFECT_QUERY_PARAM]),
    );

    private directionFilter$: Observable<"POSITIVE" | "NEGATIVE"> = this.route.queryParams.pipe(
        startWith(this.route.snapshot.queryParams),
        map(params => {
            return params[this.DIR_QUERY_PARAM] ?? "POSITIVE";
        }),
    );

    public traits$ = combineLatest([
        this.effectFilter$,
        this.directionFilter$,
    ]).pipe(
        switchMap(([effectFilter, dirFilter]: [string | undefined, "POSITIVE" | "NEGATIVE"]) => {
            return this.traitsService.getTraits(effectFilter, dirFilter);
        }),
        takeUntilDestroyed(),
    );

    public effects$: Observable<AutocompleteRow[]> = this.effectsService.getEffects().pipe(
        map(effects => {
            return effects.map(effect => ({
                value: effect,
                label: effect,
            }));
        }),
        takeUntilDestroyed(),
    )

    ngOnInit() {
        combineLatest([
            this.traits$,
            this.route.queryParams.pipe(
                startWith(this.route.snapshot.queryParams),
            ),
        ]).pipe(
            map(([traits, params]) => {
                const selectedTrait = params[this.TRAIT_QUERY_PARAM];
                if (traits[selectedTrait]) {
                    return traits[selectedTrait];
                }
                return null;
            }),
        ).subscribe(trait => {
            this.selectedTrait$.next(trait);
        });
    }

    @ViewChild("effectInput", {static: false})
    set effectInputRef(ref: AutocompleteComponent | undefined) {
        if (ref) {
            const effectFilter = this.route.snapshot.queryParams[this.EFFECT_QUERY_PARAM];
            if (effectFilter) {
                ref.setValue(effectFilter);
            }
        }
    }

    public selectTrait(traitName: string) {
        this.setQueryParam(this.TRAIT_QUERY_PARAM, traitName);
    }

    public clearTrait() {
        this.setQueryParam(this.TRAIT_QUERY_PARAM, undefined);
    }

    public selectedEffect(effect: AutocompleteRow | undefined) {
        this.setQueryParam(this.EFFECT_QUERY_PARAM, effect?.value);
    }

    public setDirection(direction: "POSITIVE" | "NEGATIVE") {
        this.setQueryParam(this.DIR_QUERY_PARAM, direction);
    }

    private setQueryParam(key: string, value: string | undefined) {
        this.router.navigate([], {
            queryParams: {
                [key]: value,
            },
            relativeTo: this.route,
            queryParamsHandling: "merge"
        });
    }
}

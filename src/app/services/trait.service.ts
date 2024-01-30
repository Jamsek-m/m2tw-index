import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of, switchMap, tap } from "rxjs";
import { Trait, Traits } from "../lib";

@Injectable({
    providedIn: "root",
})
export class TraitService {

    private http: HttpClient = inject(HttpClient);

    private traits$ = new BehaviorSubject<Traits | null>(null);

    public getTraits(effectFilter: string | undefined, dirFilter: "POSITIVE" | "NEGATIVE"): Observable<Traits> {
        return this.traits$.pipe(
            switchMap((traits) => {
                if (traits !== null) {
                    return of(traits);
                }
                return this.http.get("/assets/traits.json").pipe(
                    map(res => res as Traits),
                    tap(traits => {
                        this.traits$.next(traits);
                    }),
                );
            }),
            map((traits) => {
                if (!effectFilter) {
                    return traits;
                }

                return Object.entries(traits).reduce((acc: Traits, [traitName, trait]) => {
                    if (this.filterTrait(effectFilter, trait, dirFilter)) {
                        return {
                            ...acc,
                            [traitName]: trait,
                        };
                    }
                    return acc;
                }, {});
            })
        );
    }

    private filterTrait(filter: string, trait: Trait, dirFilter: "POSITIVE" | "NEGATIVE"): boolean {
        return !!trait.levels.find(level => {

            return !!Object.entries(level.effects).find(([effectName, effectValue]) => {
                return filter.toLowerCase() === effectName.toLowerCase() && (
                    (dirFilter === "POSITIVE" && effectValue > 0) ||
                    (dirFilter === "NEGATIVE" && effectValue < 0)
                );
            })
        });
    }

}

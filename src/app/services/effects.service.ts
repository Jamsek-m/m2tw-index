import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of, switchMap, tap } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class EffectsService {

    private http: HttpClient = inject(HttpClient);

    private effects$ = new BehaviorSubject<string[]>([]);

    public getEffects(): Observable<string[]> {
        return this.effects$.pipe(
            switchMap((effects) => {
                if (effects.length > 0) {
                    return of(effects);
                }
                return this.http.get("/assets/effects.json").pipe(
                    map(res => res as string[]),
                    tap(effects => {
                        this.effects$.next(effects);
                    }),
                );
            }),
        );
    }

}

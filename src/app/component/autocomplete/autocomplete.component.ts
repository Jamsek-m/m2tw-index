import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AsyncPipe, NgClass } from "@angular/common";
import {
    BehaviorSubject,
    map,
    Observable,
    debounceTime,
    distinctUntilChanged,
} from "rxjs";
import { AutocompleteRow } from "./types";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "app-autocomplete",
    standalone: true,
    imports: [
        AsyncPipe,
        NgClass,
        FontAwesomeModule,
    ],
    templateUrl: "./autocomplete.component.html",
    styleUrl: "./autocomplete.component.scss"
})
export class AutocompleteComponent {

    public readonly trashIcon = faTrashCan;

    @Input()
    public source: AutocompleteRow[] = [];

    @Input()
    public placeholder = "Search...";

    @Output()
    public whenSelected = new EventEmitter<AutocompleteRow | undefined>();

    @ViewChild("queryInput", {static: true})
    private queryInputRef: ElementRef<HTMLInputElement>;

    protected query$ = new BehaviorSubject<string>("");
    protected visibleResults = false;

    protected results$: Observable<AutocompleteRow[]> = this.query$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((query) => {
            const q = query.trim().toLowerCase();
            if (q.length > 0) {
                return this.source.filter(sourceItem => {
                    const item = `${sourceItem.value} ${sourceItem.label}`.toLowerCase();
                    return item.includes(q);
                });
            }
            return [];
        }),
    );

    protected onItemSelect(item: AutocompleteRow) {
        this.visibleResults = false;
        this.whenSelected.next(item);
        this.queryInputRef.nativeElement.value = item.label;
    }

    protected onQueryInput(query: string) {
        this.query$.next(query);
        this.visibleResults = true;
    }

    protected onInputFocus() {
        this.visibleResults = true;
    }

    public setValue(value: string) {
        this.queryInputRef.nativeElement.value = value;
    }

    protected onClear() {
        this.whenSelected.next(undefined);
        this.visibleResults = false;
        this.queryInputRef.nativeElement.value = "";
        this.query$.next("");
    }

}

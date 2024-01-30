import { Component, inject, OnInit } from "@angular/core";
import { PageLayoutComponent } from "../../../layouts/page-layout/page-layout.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { map } from "rxjs";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { getNextGrowth, GROWTH_THRESHOLDS, GrowthType } from "./thresholds";

@Component({
    selector: "app-city-growth-page",
    standalone: true,
    imports: [
        PageLayoutComponent,
        ReactiveFormsModule,
        AsyncPipe,
        JsonPipe,
    ],
    templateUrl: "./city-growth-page.component.html",
    styleUrl: "./city-growth-page.component.scss"
})
export class CityGrowthPageComponent implements OnInit {

    private fb = inject(FormBuilder);

    public form = this.fb.group({
        type: this.fb.control<GrowthType>("city"),
        population: this.fb.control<number>(0),
        growth: this.fb.control<number>(0.01),
    });

    public nextLevel$ = this.form.valueChanges.pipe(
        map(formValues => {
            if (formValues.type && (formValues.population ?? 0) > 0 && (formValues.growth ?? 0) > 0) {
                return getNextGrowth(
                    formValues.population ?? 0,
                    formValues.growth ?? 0,
                    formValues.type,
                );
            }
            return null;
        }),
    );


    ngOnInit(): void {
        this.nextLevel$.subscribe();
    }
}

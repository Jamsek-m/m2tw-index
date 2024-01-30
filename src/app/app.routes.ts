import { Routes } from "@angular/router";
import { TraitsListPageComponent } from "./pages/traits/traits-list-page/traits-list-page.component";
import { CityGrowthPageComponent } from "./pages/traits/city-growth-page/city-growth-page.component";

export const routes: Routes = [
    {path: "traits", component: TraitsListPageComponent},
    {path: "city-growth", component: CityGrowthPageComponent},
    {path: "**", redirectTo: "/traits"}
];

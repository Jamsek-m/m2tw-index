import { Routes } from "@angular/router";
import { TraitsListPageComponent } from "./pages/traits/traits-list-page/traits-list-page.component";

export const routes: Routes = [
    {path: "traits", component: TraitsListPageComponent},
    {path: "**", redirectTo: "/traits"}
];

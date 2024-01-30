import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideTraitEffectsPipe } from "./pipes/trait-effects.pipe";


export const appConfig: ApplicationConfig = {
    providers: [
        provideTraitEffectsPipe(),
        provideHttpClient(),
        provideRouter(routes),
    ]
};

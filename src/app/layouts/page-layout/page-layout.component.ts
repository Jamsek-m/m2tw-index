import { Component, Input } from "@angular/core";
import { PageHeaderComponent } from "../page-header/page-header.component";

@Component({
    selector: "app-page-layout",
    standalone: true,
    imports: [
        PageHeaderComponent,
    ],
    templateUrl: "./page-layout.component.html",
    styleUrl: "./page-layout.component.scss"
})
export class PageLayoutComponent {

    @Input()
    public header: boolean = true;

}

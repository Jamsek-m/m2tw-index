import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-page-header',
  standalone: true,
    imports: [
        RouterLink,
        NgClass
    ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {

    private route = inject(ActivatedRoute);
    public currentRoute = "";

    ngOnInit() {
        this.route.url.subscribe(url => {
            const [pathPart, ] = url;
            this.currentRoute = pathPart.path;
        });
    }
}

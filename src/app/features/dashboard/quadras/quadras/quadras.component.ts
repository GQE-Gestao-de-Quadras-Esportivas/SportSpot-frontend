import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-quadras',
    templateUrl: 'quadras.component.html',
    styleUrl: 'quadras.component.scss',
    imports: [MatIcon]
})

export class QuadrasComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    constructor() { }

    ngOnInit() { }

    changeRoute(route: string) {
        this.router.navigate([route], { relativeTo: this.route })
    }
}
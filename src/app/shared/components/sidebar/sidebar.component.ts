import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: 'sidebar.component.html',
    styleUrl: 'sidebar.component.scss',
    imports: [MatIcon]
})

export class SideBarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
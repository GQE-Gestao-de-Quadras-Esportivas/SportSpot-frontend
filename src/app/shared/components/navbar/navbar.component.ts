import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrl: 'navbar.component.scss',
    imports: [MatIcon],
})

export class NavBarComponent implements OnInit {
    @Output() toggleMenu = new EventEmitter<void>();
    
    constructor() { }

    ngOnInit() { }
}
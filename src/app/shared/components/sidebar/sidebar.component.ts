import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { UserService } from '../../../features/users/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: 'sidebar.component.html',
    styleUrl: 'sidebar.component.scss',
    imports: [MatIcon]
})

export class SideBarComponent implements OnInit {
    userService = inject(UserService);
    private router = inject(Router);

    constructor() { }

    ngOnInit() { }

    logout() {
        this.userService.logout();
        this.router.navigate(['/'])
    }
}
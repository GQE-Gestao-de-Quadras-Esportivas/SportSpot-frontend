import { Routes } from "@angular/router";

export const USER_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./user-login-form/user-login-form.component').then(m => m.UserLoginFormComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./user-register-form/user-register-form.component').then(m => m.UserRegisterFormComponent)
    },
]
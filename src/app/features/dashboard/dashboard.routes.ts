import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'quadras',
    loadComponent: () =>
      import('./quadras/quadras/quadras.component').then((m) => m.QuadrasComponent),
  },
  {
    path: 'quadras/cadastrar-quadra',
    loadComponent: () =>
      import('./quadras/cadastrar-quadra/cadastrar-quadra.component').then(
        (m) => m.CadastrarQuadraComponent,
      ),
  },
];

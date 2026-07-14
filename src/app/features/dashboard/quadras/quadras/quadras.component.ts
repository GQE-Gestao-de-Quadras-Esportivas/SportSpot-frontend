import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from '../services/court.service';

@Component({
  selector: 'app-quadras',
  templateUrl: 'quadras.component.html',
  styleUrl: 'quadras.component.scss',
  imports: [MatIcon],
})
export class QuadrasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courtService = inject(CourtService);

  public courts: any[] = [];
  public loading = signal(false);

  constructor() {}

  ngOnInit() {
    this.carregarQuadras();
  }

  carregarQuadras() {
    this.loading.set(true);
    this.courtService.listCourts().subscribe({
      next: (dados) => {
        this.courts = dados;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar quadras:', err);
        this.loading.set(false);
      },
    });
  }

  changeRoute(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }
}

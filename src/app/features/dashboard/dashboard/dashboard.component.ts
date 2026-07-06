import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

interface Agendamento {
  cliente: string;
  iniciais: string;
  id: string;
  horario: string;
  quadra: string;
  modalidade: 'TENNIS' | 'PADEL';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  // Massa de dados correspondente à tabela da imagem
  agendamentos: Agendamento[] = [
    {
      cliente: 'Ricardo Mendonça',
      iniciais: 'RM',
      id: '#8294',
      horario: '14:00 - 15:30',
      quadra: 'Quadra Central (Q1)',
      modalidade: 'TENNIS'
    },
    {
      cliente: 'Lucas Almeida',
      iniciais: 'LA',
      id: '#8295',
      horario: '15:30 - 16:30',
      quadra: 'Quadra Norte (Q2)',
      modalidade: 'PADEL'
    },
    {
      cliente: 'Fernanda Silva',
      iniciais: 'FS',
      id: '#8296',
      horario: '16:00 - 17:30',
      quadra: 'Quadra Sul (Q4)',
      modalidade: 'PADEL'
    }
  ];
}
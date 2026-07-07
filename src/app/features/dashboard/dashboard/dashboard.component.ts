import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";

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
  imports: [CommonModule, MatCardModule, MatIcon, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  today = signal<Date>(new Date());

  
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
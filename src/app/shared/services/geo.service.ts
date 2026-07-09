import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
  erro: boolean;
}

@Injectable({ providedIn: 'root' })
export class GeoService {
  private http = inject(HttpClient);

  getAddress(cep: string): Observable<Address> {
    const url = 'https://viacep.com.br/ws';
    const returnFormat = 'json';
    return this.http.get<Address>(`${url}/${cep}/${returnFormat}/`, { withCredentials: false });
  }
}

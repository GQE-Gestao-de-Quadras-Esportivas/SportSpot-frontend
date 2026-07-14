import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CourtRegisterFormModel } from '../../../../shared/interfaces/Court';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourtService {
  private http = inject(HttpClient);

  listCourts(): Observable<any[]> {
    return this.http.get<any[]>('courts/', {
      withCredentials: true,
    });
  }
  registerCourt(courtData: CourtRegisterFormModel) {
    return this.http.post('courts/register', courtData, {
      withCredentials: true,
    });
  }
}

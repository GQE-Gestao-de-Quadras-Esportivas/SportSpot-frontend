import { inject, Injectable, signal } from '@angular/core';
import { UserLoginFormModel, UserRegisterFormModel } from '../../../shared/interfaces/User';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private tokenSignal = signal<string | null>(null);

  get accessToken(): string | null {
    return this.tokenSignal();
  }

  get isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }

  login(userData: UserLoginFormModel) {
    return this.http
      .post<{ accessToken: string; user: { id: string; name: string } }>('auth/login', userData, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.tokenSignal.set(response.accessToken);
        }),
      );
  }

  register(userData: UserRegisterFormModel) {
    return this.http.post<any[]>('auth/register', userData);
  }

  updateAccessToken(newToken: string) {
    this.tokenSignal.set(newToken);
  }

  logout() {
    this.tokenSignal.set(null);
  }
}

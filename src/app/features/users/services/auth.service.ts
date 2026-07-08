import { computed, inject, Injectable, signal } from '@angular/core';
import { UserLoginFormModel, UserRegisterFormModel } from '../../../shared/interfaces/User';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';

export interface UserAuthenticated {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private tokenSignal = signal<string | null>(null);

  readonly currentUser = computed<UserAuthenticated | null>(() => {
    const token = this.tokenSignal();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.sub,
        name: decoded.name,
        role: decoded.role
      };
    } catch (error) {
      console.error('Token JWT inválido:', error);
      return null;
    }
  });

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

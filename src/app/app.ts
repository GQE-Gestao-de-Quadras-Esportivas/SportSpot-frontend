import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './features/users/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sportspot-frontend');
  private http = inject(HttpClient);
  private userService = inject(UserService);

  ngOnInit() {
    this.http.post<{ accessToken: string }>('auth/refresh', {}, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.userService.updateAccessToken(response.accessToken);
        },
        error: () => {
          this.userService.logout();
        }
      });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginFormControls } from '../../../shared/interfaces/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/auth.service';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: 'user-login-form.component.html',
  styleUrl: 'user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  protected loginForm = this.fb.group<UserLoginFormControls>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  ngOnInit() {}

  goToRegister() {
    this.router.navigate(['../register'], {relativeTo: this.route})
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.getRawValue();
    this.userService.login(payload).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        console.error('Erro ao entrar:', err)
      }
    })
  }
}

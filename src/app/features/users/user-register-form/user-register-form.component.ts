import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterFormControls } from '../../../shared/interfaces/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: 'user-register-form.component.html',
  styleUrl: 'user-register-form.component.scss'
})
export class UserRegisterFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  userType = signal<string>('');

  protected registerForm = this.fb.group<UserRegisterFormControls>({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    document: this.fb.control('', [Validators.required]),
    date_of_birth: this.fb.control('', [Validators.required]),
    phone_number: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    confirm_password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit() {
    this.registerForm.controls.email.valueChanges.subscribe((value) => {
      console.log(value.toUpperCase());
    });
  }

  goToLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = this.registerForm.getRawValue();
    this.userService.register(payload).subscribe({
      next: () => {
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err)
      }
    });
  }
}

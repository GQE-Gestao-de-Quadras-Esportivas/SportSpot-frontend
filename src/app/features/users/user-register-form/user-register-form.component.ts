import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterFormControls } from '../../../shared/interfaces/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: 'user-register-form.component.html',
  styleUrl: 'user-register-form.component.scss',
})
export class UserRegisterFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);

  userType = signal<string>('');

  protected registerForm = this.fb.group<UserRegisterFormControls>({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    document: this.fb.control('', [Validators.required]),
    phone_number: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    confirm_password: this.fb.control('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit() {
    this.registerForm.controls.email.valueChanges.subscribe((value) => {
      console.log(value.toUpperCase());
    });
  }

  goToLogin() {
    this.router.navigate(['../login'], {relativeTo: this.route})
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // Ativa visualmente os erros em todos os campos
      return;
    }

    // .getRawValue() extrai o objeto limpo mesmo se houver campos desabilitados
    const payload = this.registerForm.getRawValue();
    console.log('Dados prontos para a API:', {...payload, user_type: 'landowner'});
  }
}

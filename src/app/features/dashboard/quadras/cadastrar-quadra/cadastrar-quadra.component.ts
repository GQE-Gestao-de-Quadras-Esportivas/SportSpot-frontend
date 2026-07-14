import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Address, GeoService } from '../../../../shared/services/geo.service';
import { CourtRegisterFormControls } from '../../../../shared/interfaces/Court';
import { CourtService } from '../services/court.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-quadra',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './cadastrar-quadra.component.html',
  styleUrls: ['./cadastrar-quadra.component.scss'],
})
export class CadastrarQuadraComponent implements OnInit {
  private geoService = inject(GeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  private courtService = inject(CourtService);

  protected quadraForm = this.fb.group<CourtRegisterFormControls>({
    court_name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    sport: this.fb.control('', Validators.required),
    price: this.fb.control('', [Validators.required, Validators.min(0)]),
    ground_type: this.fb.control('', Validators.required),
    cep: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]{8}$|^[0-9]{5}-[0-9]{3}$/)]),
    address: this.fb.control('', Validators.required),
    address_number: this.fb.control('', Validators.required),
    neighborhood: this.fb.control('', Validators.required),
    city: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required),
    descricao: this.fb.control(''),
    temCobertura: this.fb.control(false),
    temIluminacao: this.fb.control(false),
    temVestiario: this.fb.control(false),
  });

  ngOnInit(): void { }

  buscarCep(): void {
    const cepValor = this.quadraForm.get('cep')?.value;
    if (!cepValor) return;

    const cepLimpo = cepValor.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      this.geoService.getAddress(cepLimpo).subscribe({
        next: (dados: Address) => {
          if (!dados.erro) {
            this.quadraForm.patchValue({
              address: `${dados.logradouro}`,
              neighborhood: `${dados.bairro}`,
              city: `${dados.localidade}`,
              state: `${dados.uf}`,
            });
          } else {
            alert('CEP não encontrado.');
            this.limparCamposEndereco();
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar CEP:', erro);
          this.limparCamposEndereco();
        },
      });
    }
  }

  limparCamposEndereco(): void {
    this.quadraForm.patchValue({
      address: '',
      address_number: '',
      neighborhood: '',
      city: '',
      state: '',
    });
  }

  onSubmit(): void {
    if (this.quadraForm.invalid) {
      this.quadraForm.markAllAsTouched();
      return;
    }

    const payload = this.quadraForm.getRawValue();
    this.courtService.registerCourt(payload).subscribe({
      next: () => {
        this.router.navigate(['/'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error('Erro ao cadastrar quadra:', err)
      }
    })
  }
}

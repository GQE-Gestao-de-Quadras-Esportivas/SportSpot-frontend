import { FormControl } from "@angular/forms";

export interface CourtRegisterFormModel {
  court_name: string;
  sport: string;
  price: string;
  ground_type: string;
  cep: string;
  address: string;
  address_number: string;
  neighborhood: string;
  city: string;
  state: string;
  descricao: string;
  resources: {
    temCobertura: boolean;
    temIluminacao: boolean;
    temVestiario: boolean;
  }
}

export interface CourtRegisterFormControls {
  court_name: FormControl<string>;
  sport: FormControl<string>;
  price: FormControl<string>;
  ground_type: FormControl<string>;
  cep: FormControl<string>;
  address: FormControl<string>;
  address_number: FormControl<string>;
  neighborhood: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  descricao: FormControl<string>;
  temCobertura: FormControl<boolean>;
  temIluminacao: FormControl<boolean>;
  temVestiario: FormControl<boolean>;
}

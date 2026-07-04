import { FormControl } from '@angular/forms';

export interface UserLoginFormModel {
  email: string;
  password: string;
}

export interface UserRegisterFormModel {
  name: string;
  document: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface UserLoginFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface UserRegisterFormControls {
  name: FormControl<string>;
  document: FormControl<string>;
  date_of_birth: FormControl<string>;
  phone_number: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirm_password: FormControl<string>;
}
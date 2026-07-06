import { inject, Injectable } from "@angular/core";
import { UserLoginFormModel, UserRegisterFormModel } from "../../../shared/interfaces/User";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);

    login(userData: UserLoginFormModel) {
        return this.http.post<any[]>('auth/login', userData)
    }

    register(userData: UserRegisterFormModel) {
        return this.http.post<any[]>('auth/register', userData)
    }
}
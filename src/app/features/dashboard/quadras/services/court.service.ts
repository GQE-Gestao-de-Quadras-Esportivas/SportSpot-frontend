import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { CourtRegisterFormModel } from "../../../../shared/interfaces/Court";

export class CourtService {
    private http = inject(HttpClient);
    
    registerCourt(payload: CourtRegisterFormModel) {
        
    }
}
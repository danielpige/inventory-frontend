import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../core/services/http.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/apiResponse.model';
import { Audit } from '../../../../../core/models/audit.model';

@Injectable({
  providedIn: 'root',
})
export class AuditsService {
  private readonly ENDPOINTS = {
    BASE_ID: (id: string) => 'audits/user/' + id,
  };

  constructor(private httpSvc: HttpService) {}

  getProductsById(id: string): Observable<Audit[]> {
    return this.httpSvc.get<ApiResponse<Audit[]>>(this.ENDPOINTS.BASE_ID(id)).pipe(
      map((res) => {
        return res.data;
      })
    );
  }
}

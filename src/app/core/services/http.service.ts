import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/apiResponse.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private readonly snackBarSvc: SnackBarService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  get<T>(url: string, params?: any, headers?: any): Observable<T> {
    return this.http
      .get<T>(this.baseUrl + url, {
        params: new HttpParams({ fromObject: params }),
        headers: new HttpHeaders(headers),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getBlob(url: string, params?: Record<string, any>, headers?: Record<string, string>): Observable<Blob> {
    return this.http
      .get(this.baseUrl + url, {
        params: new HttpParams({ fromObject: params ?? {} }),
        headers: new HttpHeaders(headers ?? {}),
        responseType: 'blob', // <- Muy importante
        observe: 'body',
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http
      .post<T>(this.baseUrl + url, body, {
        headers: new HttpHeaders(headers),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  put<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http
      .put<T>(this.baseUrl + url, body, {
        headers: new HttpHeaders(headers),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  patch<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http
      .patch<T>(this.baseUrl + url, body, {
        headers: new HttpHeaders(headers),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete<T>(url: string, params?: any, headers?: any): Observable<T> {
    return this.http
      .delete<T>(this.baseUrl + url, {
        params: new HttpParams({ fromObject: params }),
        headers: new HttpHeaders(headers),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: any) {
    console.error('[HTTP ERROR]:', error);

    if (error?.status === 401) {
      this.authSvc.logout();
      this.router.navigate(['/auth/login']);
    }

    const message = error?.error?.message || 'Ha ocurrido un error inesperado.';

    this.snackBarSvc.error(message);

    return throwError(() => error);
  }
}

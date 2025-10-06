import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../core/services/http.service';
import { Product, ProductFilters, ProductsPaginated } from '../../../../../core/models/product.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/apiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly ENDPOINTS = {
    BASE: 'products',
    BASE_ID: (id: string) => 'products/' + id,
    BASE_FILTERS: (filters: string) => 'products' + filters,
    EXPORT: (filters: string) => 'products/export' + filters,
    IMPORT: 'products/import',
  };

  constructor(private httpSvc: HttpService) {}

  createProduct(productData: Product): Observable<ApiResponse<any>> {
    return this.httpSvc.post<ApiResponse<any>>(this.ENDPOINTS.BASE, productData);
  }

  updateProduct(productData: Product, id: string): Observable<ApiResponse<any>> {
    return this.httpSvc.patch<ApiResponse<any>>(this.ENDPOINTS.BASE_ID(id), productData);
  }

  deleteProduct(id: string): Observable<ApiResponse<any>> {
    return this.httpSvc.delete<ApiResponse<any>>(this.ENDPOINTS.BASE_ID(id));
  }

  getProducts(productFilters: ProductFilters): Observable<ProductsPaginated> {
    return this.httpSvc
      .get<ApiResponse<ProductsPaginated>>(this.ENDPOINTS.BASE_FILTERS(this.filtersToString(productFilters)))
      .pipe(map((res) => res.data));
  }

  getProductById(id: string): Observable<ApiResponse<any>> {
    return this.httpSvc.get<ApiResponse<any>>(this.ENDPOINTS.BASE_ID(id));
  }

  exportProducts(productFilters: ProductFilters): Observable<Blob> {
    return this.httpSvc.getBlob(this.ENDPOINTS.EXPORT(this.filtersToString(productFilters)));
  }

  importProducts(formData: FormData): Observable<ApiResponse<any>> {
    return this.httpSvc.post<ApiResponse<any>>(this.ENDPOINTS.IMPORT, formData);
  }

  filtersToString(productFilters: ProductFilters): string {
    return `?search=${productFilters?.search}&category=${productFilters?.category}&minPrice=${productFilters?.minPrice}&maxPrice=${productFilters?.maxPrice}&page=${productFilters?.page}&limit=${productFilters?.limit}&sort=${productFilters?.sort}`;
  }
}

import { FormControl } from '@angular/forms';

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  category: string;
}

export type ProductForm = {
  [K in keyof Product]?: FormControl<Product[K] | null>;
};

export interface ProductFilters {
  search?: string | null;
  category?: string | null;
  sortType?: string | null;
  field?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  page?: number | null;
  limit?: number | null;
  sort?: string;
}

export type FiltersProductForm = {
  [K in keyof ProductFilters]?: FormControl<ProductFilters[K] | null>;
};

export interface ProductsPaginated {
  items: ProductData[];
  meta: Pagination;
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Pagination {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

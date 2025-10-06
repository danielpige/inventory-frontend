import { Component, OnInit } from '@angular/core';
import { ProductsService } from './service/products.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FiltersProductForm, ProductData, ProductFilters } from '../../../../core/models/product.model';
import { TableAction } from '../../../../core/models/table.model';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['name', 'price', 'category', 'stock'];
  loading = false;
  products: any[] = [];
  length = 0;
  actionList: TableAction[] = [
    {
      title: 'Editar producto',
      event: 'edit',
      icon: 'edit',
    },
    {
      title: 'Eliminar producto',
      event: 'delete',
      icon: 'delete',
    },
  ];

  filters!: FormGroup<FiltersProductForm>;

  constructor(private productSvc: ProductsService, private fb: FormBuilder, private snackBar: SnackBarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.createFilterForm();
    this.getProducts();
  }

  createFilterForm(): void {
    this.filters = this.fb.group<FiltersProductForm>({
      page: this.fb.control(1),
      limit: this.fb.control(10),
      sort: this.fb.control('createdAt:DESC'),
      search: this.fb.control(''),
      category: this.fb.control(''),
      minPrice: this.fb.control(0),
      maxPrice: this.fb.control(100000),
    });
  }

  getProducts(): void {
    this.loading = true;
    this.productSvc.getProducts(this.filters.value as ProductFilters).subscribe({
      next: (data) => {
        this.products = [...data?.items];
        this.length = data.meta.totalItems;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  getFilter(event: ProductFilters): void {
    this.sort?.setValue(event.sort);
    this.search?.setValue(event.search);
    this.category?.setValue(event.category);
    this.minPrice?.setValue(event.minPrice);
    this.maxPrice?.setValue(event.maxPrice);

    this.getProducts();
  }

  selectedAction(event: any): void {
    switch (event.event) {
      case 'edit':
        delete event.event;
        this.openForm(event);
        break;
      case 'delete':
        this.deleteProduct(event.id);
        break;
    }
  }

  openForm(data?: ProductData): void {
    const dialog = this.dialog.open(ProductFormComponent, {
      disableClose: true,
      width: '700px',
      data,
    });

    dialog.afterClosed().subscribe({
      next: (refresh) => {
        if (refresh) {
          this.getProducts();
        }
      },
    });
  }

  deleteProduct(id: string): void {
    this.loading = true;
    this.productSvc.deleteProduct(id).subscribe({
      next: (res) => {
        this.snackBar.success('Producto eliminado con éxito.');
        this.loading = false;
        this.getProducts();
      },
      error: (error) => {
        this.snackBar.error('No se pudo eliminar el producto.');
        this.loading = false;
      },
    });
  }

  getActionButtons(event: 'one' | 'two'): void {
    switch (event) {
      case 'one':
        this.exportProducts();
        break;
      case 'two':
        this.openForm();
        break;
    }
  }

  exportProducts(): void {
    this.loading = true;
    this.productSvc.exportProducts(this.filters.value as ProductFilters).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.error('No se pudieron exportar los productos.');
      },
    });
  }

  changePagination(eventPagination: PageEvent): void {
    this.page?.setValue(eventPagination.pageIndex + 1);
    this.limit?.setValue(eventPagination.pageSize);

    this.getProducts();
  }

  get page() {
    return this.filters.get('page');
  }
  get limit() {
    return this.filters.get('limit');
  }
  get sort() {
    return this.filters.get('sort');
  }
  get search() {
    return this.filters.get('search');
  }
  get category() {
    return this.filters.get('category');
  }
  get minPrice() {
    return this.filters.get('minPrice');
  }
  get maxPrice() {
    return this.filters.get('maxPrice');
  }
}

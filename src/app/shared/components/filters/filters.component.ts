import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltersProductForm, ProductFilters } from '../../../core/models/product.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  @Output() sendFilter = new EventEmitter<ProductFilters>();
  filters!: FormGroup<FiltersProductForm>;
  categoryList = ['muebles', 'papeleria', 'electronica', 'componentes'];
  fieldList = ['name', 'category', 'price', 'stock', 'createdAt', 'updatedAt'];

  constructor(private loaderSvc: LoaderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFilterForm();
  }

  createFilterForm(): void {
    this.filters = this.fb.group<FiltersProductForm | any>({
      sort: this.fb.control('createdAt:DESC'),
      field: this.fb.control('createdAt'),
      sortType: this.fb.control('DESC'),
      search: this.fb.control(''),
      category: this.fb.control(''),
      minPrice: this.fb.control(0),
      maxPrice: this.fb.control(100000),
    });
  }

  filter(): void {
    const data = this.filters.value;
    data.sort = this.filters.get('field')?.value + ':' + this.filters.get('sortType')?.value;

    delete data.field;
    delete data.sortType;

    this.sendFilter.emit(data as any);
  }

  clearFilter(): void {
    this.filters.reset({
      sort: 'createdAt:DESC',
      field: 'createdAt',
      sortType: 'DESC',
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 100000,
    });
    this.filter();
  }
}

import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Product, ProductData, ProductForm } from '../../../../../core/models/product.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup<ProductForm>;
  categoryList = ['muebles', 'papeleria', 'electronica', 'componentes'];
  loading = false;
  errors: any[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile?: File;
  readonly dialogRef = inject(MatDialogRef<ProductFormComponent>);
  readonly dialogData = inject<ProductData>(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder, private productSvc: ProductsService, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.productForm = this.fb.group<ProductForm>({
      id: this.fb.control(null),
      name: this.fb.control(null, { validators: [Validators.required, Validators.minLength(3)] }),
      category: this.fb.control(null, { validators: [Validators.required] }),
      stock: this.fb.control(0, { validators: [Validators.required, Validators.minLength(0)] }),
      price: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
    });

    if (this.dialogData) {
      const data = this.dialogData;
      delete data.createdAt;
      delete data.updatedAt;

      this.productForm.patchValue(data as any);
    }
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const data = this.productForm.value;

    delete data.id;
    const query = this.dialogData
      ? this.productSvc.updateProduct(data as Product, this.dialogData.id)
      : this.productSvc.createProduct(data as Product);

    query.subscribe({
      next: (res) => {
        this.loading = false;
        this.snackBar.success('Cambios guardados con éxito.');
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.error('Ocurrió un error al registrar producto.');
      },
    });
  }

  changeFile(event: Event): void {
    this.loading = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile as File);

    this.errors = [];

    this.productSvc.importProducts(formData).subscribe({
      next: (res) => {
        if (res?.data?.errors?.length !== 0) {
          this.errors = [...res.data.errors];
          this.snackBar.success(
            `Ha ocurrido un error, se importaron con éxito ${res.data.imported} registros, ocurrió error en ${
              (res.data.errors as any[]).length
            } registros.`
          );
          this.loading = false;
          this.clearFile();
          return;
        }
        this.snackBar.success('Datos importados con éxito.');
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.error('Ocurrió un error al importar datos.');
      },
    });
  }

  clearFile() {
    this.selectedFile = undefined;
    this.fileInput.nativeElement.value = '';
  }

  get name() {
    return this.productForm.get('name');
  }
  get category() {
    return this.productForm.get('category');
  }
  get stock() {
    return this.productForm.get('stock');
  }
  get price() {
    return this.productForm.get('price');
  }
}

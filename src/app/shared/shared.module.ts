import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from './components/table/table.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';

@NgModule({
  declarations: [LoaderComponent, TableComponent, FiltersComponent, CarouselComponent, HeaderPageComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, LayoutModule],
  exports: [CommonModule, MaterialModule, TableComponent, FiltersComponent, CarouselComponent, HeaderPageComponent, LoaderComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { ProductsComponent } from './pages/products/products.component';
import { AuditsComponent } from './pages/audits/audits.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, UserProfileComponent, ProductsComponent, AuditsComponent, ProductFormComponent],
  imports: [CommonModule, LayoutModule, DashboardRoutingModule, RouterModule, SharedModule, FormsModule, FormsModule, ReactiveFormsModule],
})
export class DashboardModule {}

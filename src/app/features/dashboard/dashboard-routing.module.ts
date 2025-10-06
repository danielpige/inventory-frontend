import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuditsComponent } from './pages/audits/audits.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: ProductsComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'audits', component: AuditsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

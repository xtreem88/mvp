import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/auth.guard';
import { RoleGuardService } from '../core/role.guard';
import { ProductFormsComponent } from './forms/forms.component';
import { ProductComponent } from './list/product.component';
import { ProductViewComponent } from './view/product.component';


const routes: Routes = [
  { path: '', component: ProductComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'view/:id', component: ProductViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: ':id/edit', component: ProductFormsComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'add', component: ProductFormsComponent, canActivate: [AuthGuardService, RoleGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
